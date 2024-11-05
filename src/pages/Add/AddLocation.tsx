import {
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCheckbox,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  useIonLoading,
} from "@ionic/react";
import GoBackHeader from "../../components/Layout/Headers/GoBackHeader/GoBackHeader";
import {
  add,
  closeCircle,
  helpCircleOutline,
  images,
  imagesOutline,
  location,
  map,
  trashBinOutline,
} from "ionicons/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import FormHeaderDivider from "../../components/Layout/FormHeaderDivider/FormHeaderDivider";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fileArrayToUrlArray,
  fileListToUrlArray,
  getFileExtension,
  isErrorInput,
} from "../../utils/helpers";
import {
  defaultPosition,
  IMAGE_EXTENSIONS,
  MAX_IMAGE_SIZE,
} from "../../lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  getLocationCategories,
  getLocationSizes,
  getLocationTypes,
} from "../../database/models/location";
import useSupabaseBrowser from "../../database/client";
import { getConditions } from "../../database/models/condition";
import { capitalizeFirstLetter } from "../../utils/helpers";
import SelectLocationModal from "../../components/Modals/SelectLocationModal/SelectLocationModal";
import { getEquipments } from "../../database/models/equipment";
import {
  autocompleteGeolocationSearch,
  reverseGeocode,
} from "../../lib/geo_search";
import { Geolocation, Position } from "@capacitor/geolocation";
import { centroid } from "@turf/turf";
import { LatLng, Layer } from "leaflet";
import { LocationIQAutocompleteResult, TSelectedArea } from "../../lib/types";
import FormErrorText from "../../components/Layout/Forms/FormErrorText";
import FormPreviewImages from "../../components/Layout/Forms/FormPreviewImages";
import MonthPickerButton from "../../components/Buttons/MonthPickerButton/MonthPickerButton";
import MonthIntervalPicker from "../../components/FormElements/MonthIntervalPicker";
import CheckInButton from "../../components/Buttons/CheckInButton/CheckInButton";
import React from "react";
import AccordionMonthInterval from "@/components/FormElements/AccordionMonthInterval/AccordionMonthInterval";
import { Capacitor } from "@capacitor/core";
import { newLocationSchema } from "@/lib/schemas/newLocationSchema";

type TNewLocationSchema = yup.InferType<typeof newLocationSchema>;

const selectLocationModalId = "add-location-select-location-modal";

const isCameraAvailable = Capacitor.isPluginAvailable("Camera");
const isGeolocationAvailable = Capacitor.isPluginAvailable("Geolocation");

// TODO: implement camera https://ionicframework.com/docs/native/camera
// TODO: implement native geolocation https://ionicframework.com/docs/native/geolocation
// Maybe: change select inputs to modal with icons and search, where there is a lot of options
const AddLocation: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newLocationSchema),
    defaultValues: {
      name: "",
      category: "",
      type: "",
      size: "",
      images: [],
      description: "",
      address: "",
      conditions: [],
      features: [],
      equipments: [],
      tagInput: "",
      visibility: "public",
      tags: [],
      checkedIn: false,
    },
    mode: "onBlur",

    // reValidateMode: "onBlur",
  });

  const supabase = useSupabaseBrowser();

  // https://ionicframework.com/docs/api/loading
  const [present, dismiss] = useIonLoading();

  // TODO: query all app data at once
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["add_location_categories"],
    queryFn: () => getLocationCategories(supabase),
  });

  const {
    data: types,
    isLoading: typesLoading,
    isError: typesError,
  } = useQuery({
    queryKey: ["add_location_types"],
    queryFn: () => getLocationTypes(supabase),
  });

  const {
    data: sizes,
    isLoading: sizesLoading,
    isError: sizesError,
  } = useQuery({
    queryKey: ["add_location_sizes"],
    queryFn: () => getLocationSizes(supabase),
  });

  const {
    data: conditions,
    isLoading: conditionsLoading,
    isError: conditionsError,
  } = useQuery({
    queryKey: ["add_location_conditions"],
    queryFn: () => getConditions(supabase),
  });

  const {
    data: features,
    isLoading: featuresLoading,
    isError: featuresError,
  } = useQuery({
    queryKey: ["add_location_features"],
    queryFn: () => getConditions(supabase),
  });

  const {
    data: equipments,
    isLoading: equipmentsLoading,
    isError: equipmentsError,
  } = useQuery({
    queryKey: ["add_location_equipments"],
    queryFn: () => getEquipments(supabase),
  });

  const resultRefs = useRef<(HTMLIonItemElement | null)[]>([]);

  const [searchResults, setSearchResults] = useState<
    LocationIQAutocompleteResult[] | undefined
  >([]);

  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

  const [addressButtonDisabled, setAddressButtonDisabled] = useState(true);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // States for the map modal
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [selectedArea, setSelectedArea] = useState<TSelectedArea | null>(null);

  const [checkInBtnLoading, setCheckInBtnLoading] = useState(false);

  const onSubmit: SubmitHandler<TNewLocationSchema> = async (data) => {
    // TODO: Add location to the database, show loading spinner
    const r = await present({
      message: "Adding location...",
      duration: 3000,
    });
    console.log(data);
  };

  const addTag = useCallback(() => {
    const newTag = getValues("tagInput");

    if (!newTag) {
      return;
    }

    const tags = getValues("tags");

    if (tags && tags.includes(newTag)) {
      return;
    }

    const updatedTags = tags && tags.length > 0 ? [...tags, newTag] : [newTag];

    setValue("tags", updatedTags);
    setValue("tagInput", "");
  }, [getValues, setValue]);

  const removeTag = useCallback(
    (tagToRemove: string | undefined) => {
      const tags = getValues("tags");

      if (tags && tags.length > 0) {
        const updatedTags = tags.filter((t) => t !== tagToRemove);
        setValue("tags", updatedTags);
      }
    },
    [getValues, setValue]
  );

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentImagesArr = getValues("images") as Array<File>; // File Array
      const newImagesFL = e.target.files; // FileList
      const newImagesArr = Array.from(newImagesFL as FileList);

      // check for duplicates
      const updatedImages: File[] = [];

      if (!currentImagesArr || currentImagesArr.length === 0) {
        updatedImages.push(...newImagesArr);
      } else {
        updatedImages.push(...currentImagesArr);
        for (let i = 0; i < newImagesArr.length; i++) {
          const newImage = newImagesArr[i];
          const isDuplicate = updatedImages.some(
            (img) => img.name === newImage.name
          );

          if (!isDuplicate) {
            updatedImages.push(newImage);
          }
        }
      }

      setValue("images", updatedImages);
      setPreviewImages(() => [...fileArrayToUrlArray(updatedImages)]);
    },
    [setPreviewImages]
  );

  const removeImage = useCallback(
    (index: number) => {
      const images = getValues("images") as Array<File>;

      if (images && images.length > 0) {
        const updatedImages = images.filter((_, i) => i !== index);
        setValue("images", updatedImages);
        setPreviewImages([...fileArrayToUrlArray(updatedImages)]);
      }
    },
    [getValues, setValue]
  );

  const handleAddressSearchInput = useCallback(
    async (stringQuery: string | number | null | undefined) => {
      if (!stringQuery) {
        setSearchResults([]);
        return;
      }
      const results = await autocompleteGeolocationSearch(
        stringQuery.toString()
      );
      setSearchResults(results);
    },
    [setSearchResults]
  );

  const handleOnConfirmLocation = useCallback(
    async (
      selectedArea: TSelectedArea | null,
      selectedPosition: LatLng | null
    ) => {
      if (selectedArea) {
        // center of the selected area
        const center = centroid(selectedArea.toGeoJSON());
        const lat = center.geometry.coordinates[1];
        const lon = center.geometry.coordinates[0];
        // console.log("center: ", center);
        // console.log("lat, lon: ", lat, lon);

        const reverseGeo = await reverseGeocode(lat.toString(), lon.toString());
        if (reverseGeo) {
          setValue("address", reverseGeo?.display_name);
        }
      }
      if (selectedPosition) {
        // console.log("selectedPosition: ", selectedPosition);
        const reverseGeo = await reverseGeocode(
          selectedPosition.lat.toString(),
          selectedPosition.lng.toString()
        );
        if (reverseGeo) {
          setValue("address", reverseGeo?.display_name);
        }

        // console.log("reverseGeo: ", reverseGeo);
      }
    },
    []
  );

  const handleCheckIn = useCallback(async () => {
    setCheckInBtnLoading(true);
    try {
      if (!getValues("checkedIn")) {
        const position = await Geolocation.getCurrentPosition();
        console.log("Checked in position: ", position);
        setCurrentPosition(position);

        // Calculate if the user is near the location
        // If yes, set the checkedIn to true
        setValue("checkedIn", true);
      } else {
        setValue("checkedIn", false);
      }
    } catch (error) {
      setCurrentPosition(null);
      setValue("checkedIn", false);
      console.error("Error getting position", error);
    } finally {
      // Always set loading to false after async operation finishes
      setCheckInBtnLoading(false);
    }
  }, []);

  const onSelectAccordion = (ev: AccordionGroupCustomEvent) => {
    // const collapsedItems = values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;
    const isExpanded = ev.detail.value !== undefined;
  };

  const imagesField = register("images", { required: true });

  const areImages = previewImages && previewImages.length > 0;
  const tags = watch("tags");
  const isCheckedIn = watch("checkedIn");
  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        setCurrentPosition(position);
        console.log("Current position", position);
        setAddressButtonDisabled(false);
      })
      .catch((error) => {
        console.error("Error getting position", error);
        setAddressButtonDisabled(false);
      });
  }, []);

  return (
    <IonPage>
      <GoBackHeader title="Add New Location" />
      <IonContent fullscreen className="ion-padding">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 px-2"
        >
          <IonInput
            type="text"
            labelPlacement="floating"
            fill="outline"
            label="Name"
            errorText={errors.name?.message && errors.name.message}
            className={`${isErrorInput(Boolean(errors.name))}`}
            {...register("name")}
          />

          <IonSelect
            interface="alert"
            multiple={false}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Category"
            labelPlacement="floating"
            aria-invalid={errors.category ? "true" : "false"}
            className={`${isErrorInput(Boolean(errors.category))}`}
          >
            {categories &&
              categories.map((category) => (
                <IonSelectOption key={category.name} value={category.name}>
                  {capitalizeFirstLetter(category.name)}
                </IonSelectOption>
              ))}
          </IonSelect>
          <FormErrorText>
            {errors.category?.message ? errors.category.message : null}
          </FormErrorText>

          <IonSelect
            placeholder="Select Type"
            interface="alert"
            multiple={false}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Type"
            labelPlacement="floating"
            aria-invalid={errors.type ? "true" : "false"}
            {...register("type")}
            className={`${isErrorInput(Boolean(errors.type))}`}
          >
            {types &&
              types.map((type) => (
                <IonSelectOption key={type.name} value={type.name}>
                  {capitalizeFirstLetter(type.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          {/* TODO: Change */}
          <IonSelect
            placeholder="Select Size"
            interface="alert"
            multiple={false}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Size"
            labelPlacement="floating"
            aria-invalid={errors.size ? "true" : "false"}
            {...register("size")}
            className={`${isErrorInput(Boolean(errors.size))}`}
          >
            {sizes &&
              sizes
                .sort((a, b) => (a.display_order > b.display_order ? 1 : -1))
                .map((size) => (
                  <IonSelectOption key={size.name} value={size.name}>
                    {capitalizeFirstLetter(size.name)}
                  </IonSelectOption>
                ))}
          </IonSelect>

          <FormHeaderDivider>Images</FormHeaderDivider>

          <div className="flex flex-col gap-2 ">
            <input
              multiple={true}
              aria-hidden="true"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="hidden "
              id="image-upload"
              {...imagesField}
              onChange={(e) => {
                onImageChange(e);
              }}
            />
            <label
              htmlFor="image-upload"
              className={`${areImages ? "hidden" : ""} w-full cursor-pointer flex items-center flex-col gap-4 py-8 px-4 bg-transparent text-[var(--ion-background-color-step-300)] ion-border-radius border-[var(--ion-background-color-step-300)] border-2 border-dashed`}
            >
              <IonIcon
                className="w-12 h-12 "
                slot="icon-only"
                icon={imagesOutline}
              />
              <p className="m-0">Add Images to the Location</p>
            </label>
          </div>

          <FormPreviewImages images={previewImages} removeImage={removeImage} />
          <div
            className={`${areImages ? "" : "hidden"} flex items-center gap-2`}
          >
            <IonButton
              fill="outline"
              color="danger"
              onClick={() => {
                setValue("images", []);
                setPreviewImages([]);
              }}
            >
              <IonIcon slot="icon-only" icon={trashBinOutline} />
            </IonButton>

            <IonButton
              onClick={() => {
                document.getElementById("image-upload")?.click();
              }}
              color="dark"
              className="w-full"
            >
              {/* icon to maintain height */}
              <IonIcon
                aria-hidden="true"
                className="hidden"
                slot="icon-only"
                icon={trashBinOutline}
              />
              Add more
              <IonIcon slot="end" icon={images} className="ml-2" />
            </IonButton>
          </div>

          <FormHeaderDivider>Location Details</FormHeaderDivider>

          <IonTextarea
            placeholder="Describe the location..."
            fill="outline"
            label="Description"
            labelPlacement="floating"
            helperText="Describe the location"
            errorText={
              errors.description?.message ? errors.description.message : ""
            }
            autoGrow={true}
            rows={5}
            counter={true}
            maxlength={500}
            inputmode="text"
            {...register("description")}
            className={`${isErrorInput(Boolean(errors.description))}`}
          />

          <div className="relative flex flex-row gap-2">
            <IonInput
              type="search"
              fill="outline"
              label="Address"
              labelPlacement="floating"
              debounce={500}
              onIonInput={(ev) => handleAddressSearchInput(ev.target.value)}
              errorText={errors.address?.message ? errors.address.message : ""}
              className={`${isErrorInput(Boolean(errors.address))}`}
              {...register("address")}
              clearInput={true}
              onIonBlur={() => {
                setTimeout(() => {
                  setSearchResults([]);
                }, 50); // Add a small timeout to allow click events to complete
              }}
            ></IonInput>

            <IonButton
              aria-label="Open Map Modal"
              id={selectLocationModalId}
              expand="block"
              color={"dark"}
              className="self-start w-[3.75rem] h-12"
              disabled={addressButtonDisabled}
            >
              <IonIcon slot="icon-only" icon={map} />
            </IonButton>

            {/* autocomplete results */}
            {searchResults && searchResults.length > 0 && (
              <IonList
                className="absolute transform -translate-y-1/2 -translate-x-1/2 top-[110%] w-full max-h-[200px] overflow-y-auto shadow-lg z-20 ion-border-radius"
                lines="full"
              >
                {searchResults.map((result, index) => (
                  <IonItem
                    key={result.osm_id}
                    button={true}
                    className="z-20"
                    ref={(el) => (resultRefs.current[index] = el)} // Assign ref to each IonItem
                    onClick={() => {
                      console.log("Clicked");
                      console.log("Selected result: ", result);
                      setValue("address", result.display_name);
                      setSearchResults([]);
                    }}
                  >
                    <IonLabel>{result.display_name}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}

            <SelectLocationModal
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              modalId={selectLocationModalId}
              currentPosition={currentPosition}
              onDismiss={() => {}}
              onConfirm={handleOnConfirmLocation}
            />
          </div>

          <IonSelect
            multiple={true}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Conditions"
            labelPlacement="floating"
            {...register("conditions")}
            className={`${isErrorInput(Boolean(errors.conditions))}`}
          >
            {conditions &&
              conditions.map((condition) => (
                <IonSelectOption key={condition.name} value={condition.name}>
                  {capitalizeFirstLetter(condition.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          <IonSelect
            multiple={true}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Features"
            labelPlacement="floating"
            className={`${isErrorInput(Boolean(errors.features))}`}
            {...register("features")}
          >
            {features &&
              features.map((feature) => (
                <IonSelectOption key={feature.name} value={feature.name}>
                  {capitalizeFirstLetter(feature.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          <IonSelect
            multiple={true}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Equipment"
            labelPlacement="floating"
            className={`${isErrorInput(Boolean(errors.equipments))}`}
            {...register("equipments")}
          >
            {equipments &&
              equipments.map((equipment) => (
                <IonSelectOption key={equipment.name} value={equipment.name}>
                  {capitalizeFirstLetter(equipment.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          {/* https://ionicframework.com/docs/api/accordion */}

          {/* TODO: If the acordion is opened - change the icon to a mark, and the month range is set to true
            if the accordion is collapsed, change the icon to checkbox and the month range is set to false
          */}
          <AccordionMonthInterval
            idFrom="add-location-month-from"
            idTo="add-location-month-to"
            onIonChange={onSelectAccordion}
            value="add-location-month-interval"
            label="Best time to visit"
          />
          {/* <IonAccordionGroup>
            <IonAccordion
              className="ion-border-radius"
              value="add-location-month-interval"
            >
              <IonItem slot="header" color="light">
                <IonLabel>Best time to visit</IonLabel>
              </IonItem>
              <div
                className={`py-2 px-2   rounded-t-none  rounded-b-[var(--ion-border-radius)] border-t-0 border-[var(--ion-background-color-step-300)] border-solid border-1 `}
                slot="content"
              >
                <MonthIntervalPicker
                  idFrom="add-location-month-from"
                  idTo="to"
                />
              </div>
            </IonAccordion>
          </IonAccordionGroup> */}

          <FormHeaderDivider>Additional Info</FormHeaderDivider>

          {/* FIXME: fix focus navigation stoppage on tag input */}
          <IonInput
            type="text"
            fill="outline"
            label="Tags"
            labelPlacement="floating"
            placeholder="Add Tags"
            {...register("tagInput")}
            errorText={errors.tagInput?.message ? errors.tagInput.message : ""}
            className={`${isErrorInput(Boolean(errors.tagInput))}`}
          >
            <IonButton
              slot="end"
              color={"dark"}
              fill="solid"
              aria-label="Add Tag"
              onClick={addTag}
            >
              <IonIcon slot="icon-only" icon={add} aria-hidden="true" />
            </IonButton>
          </IonInput>

          <div className="mb-6">
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => (
                <IonChip
                  color={"secondary"}
                  onClick={() => removeTag(tag)}
                  key={tag}
                >
                  <IonLabel>{tag}</IonLabel>
                  <IonIcon icon={closeCircle}></IonIcon>
                </IonChip>
              ))}
          </div>

          <IonRadioGroup
            allowEmptySelection={false}
            name="visibility"
            defaultValue={"public"}
            value={getValues("visibility")}
            className="relative flex flex-row flex-wrap items-center gap-10 form-field-group"
          >
            <label className="absolute text-xs bg-[var(--ion-background-color)] px-1 -top-2 label-text-wrapper">
              <div className="label-text">Visibility</div>
            </label>

            <IonRadio
              defaultChecked={true}
              color={"dark"}
              value="public"
              {...register("visibility")}
            >
              Public
            </IonRadio>
            <IonRadio
              color={"dark"}
              {...register("visibility")}
              value="private"
            >
              Private
            </IonRadio>
          </IonRadioGroup>

          <div className="flex items-center gap-2 pl-2 mt-2">
            <label className="label-text-wrapper ">
              <div className="label-text">Are you in the location?</div>
            </label>
            <CheckInButton
              checkedIn={isCheckedIn}
              handleCheckIn={handleCheckIn}
              loading={checkInBtnLoading}
            />

            <input
              type="hidden"
              {...register("checkedIn")}
              className="hidden "
            />

            <IonButton shape="round" color={"dark"} fill="clear">
              <IonIcon slot="icon-only" icon={helpCircleOutline} />
            </IonButton>
          </div>

          <div className="flex items-center justify-between mt-8 ">
            <IonButton fill="outline" color={"danger"} className="">
              Cancel
            </IonButton>

            <IonButton size="large" type="submit" className="font-bold">
              Confirm
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddLocation;
