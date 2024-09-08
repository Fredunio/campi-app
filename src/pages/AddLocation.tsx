import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import GoBackHeader from "../components/Layout/Headers/GoBackHeader/GoBackHeader";
import {
  add,
  closeCircle,
  helpCircleOutline,
  images,
  imagesOutline,
  location,
  map,
  searchCircle,
  trashBin,
  trashBinOutline,
} from "ionicons/icons";
import { useCallback, useState } from "react";
import FormHeaderDivider from "../components/Layout/FormHeaderDivider/FormHeaderDivider";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fileArrayToUrlArray,
  fileListToUrlArray,
  getFileExtension,
  isErrorInput,
} from "../utils/helpers";
import FormErrorText from "../components/Layout/Forms/FormErrorText";
import FormPreviewImages from "../components/Layout/Forms/FormPreviewImages";
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "../lib/variables";
import { useQuery } from "@tanstack/react-query";
import {
  getLocationCategories,
  getLocationSizes,
  getLocationTypes,
} from "../database/models/location";
import useSupabaseBrowser from "../database/client";
import { getConditions } from "../database/models/condition";
import { capitalizeFirstLetter } from "../utils/helpers";
import SelectLocationModal from "../components/Modals/SelectLocationModal/SelectLocationModal";
import { getEquipments } from "../database/models/equipment";
import { autocompleteGeolocationSearch } from "../lib/geo_search";

const NewLocationInputsSchema = yup.object().shape({
  name: yup.string().required().min(3),
  category: yup.string().required(),
  type: yup.string().required(),
  size: yup.string().required(),
  images: yup
    .mixed()
    .notRequired()
    .test({
      message: "Please provide a supported file type",
      test: (fileArray, context) => {
        if (!fileArray) {
          return true;
        }
        if (!(fileArray instanceof Array)) {
          return false;
        }

        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i];
          const extension = getFileExtension(file.name);
          if (!extension || !IMAGE_EXTENSIONS.includes(extension)) {
            context?.createError();
            break;
          }
        }
      },
    })
    .test({
      message: `File too big, can't exceed ${MAX_IMAGE_SIZE}`,
      test: (fileArray) => {
        if (!(fileArray instanceof Array)) {
          return false;
        }

        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i];
          if (file.size < MAX_IMAGE_SIZE) {
            return false;
          }
        }
      },
    }),
  description: yup.string().required(),
  address: yup.string().required(),
  conditions: yup.array().of(yup.string()).notRequired(),
  equipment: yup.array().of(yup.string()).notRequired(),
  tagInput: yup.string().notRequired(),
  tags: yup.array().of(yup.string()).required(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
});

type TNewLocationInputsSchema = yup.InferType<typeof NewLocationInputsSchema>;

const selectLocationModalId = "add-location-select-location-modal";

// TODO: add camera
const AddLocation: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewLocationInputsSchema),
    defaultValues: {
      tagInput: "",
      visibility: "public",
      tags: [],
    },
    reValidateMode: "onBlur",
  });

  const supabase = useSupabaseBrowser();

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
    data: equipments,
    isLoading: equipmentsLoading,
    isError: equipmentsError,
  } = useQuery({
    queryKey: ["add_location_equipments"],
    queryFn: () => getEquipments(supabase),
  });

  // TODO: Add type for searchResults
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<TNewLocationInputsSchema> = (data) => {
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

  const handleSearchInput = useCallback(
    async (ev: CustomEvent) => {
      const query = ev.detail.value;
      if (!query) {
        setSearchResults([]);
        return;
      }
      const results = await autocompleteGeolocationSearch(query);
      setSearchResults(results);
    },
    [setSearchResults]
  );

  const imagesField = register("images", { required: true });

  const areImages = previewImages && previewImages.length > 0;
  const tags = watch("tags");

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
            placeholder="Select Category"
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
            {/* <IonSelectOption value="1">Category 1</IonSelectOption>
            <IonSelectOption value="2">Category 2</IonSelectOption>
            <IonSelectOption value="3">Category 3</IonSelectOption> */}
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
            className={`${isErrorInput(Boolean(errors.type))}`}
          >
            {/* <IonSelectOption value="1">Type 1</IonSelectOption> */}
            {/* <IonSelectOption value="2">Type 2</IonSelectOption> */}
            {/* <IonSelectOption value="3">Type 3</IonSelectOption> */}
            {types &&
              types.map((type) => (
                <IonSelectOption key={type.name} value={type.name}>
                  {capitalizeFirstLetter(type.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          <IonSelect
            placeholder="Select Size"
            interface="alert"
            multiple={false}
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Size"
            labelPlacement="floating"
            className={`${isErrorInput(Boolean(errors.size))}`}
          >
            {/* <IonSelectOption value="1">Size 1</IonSelectOption>
            <IonSelectOption value="2">Size 2</IonSelectOption>
            <IonSelectOption value="3">Size 3</IonSelectOption> */}
            {sizes &&
              sizes
                .sort((a, b) => (a.order > b.order ? 1 : -1))
                .map((size) => (
                  <IonSelectOption key={size.name} value={size.name}>
                    {capitalizeFirstLetter(size.name)}
                  </IonSelectOption>
                ))}
          </IonSelect>

          <FormHeaderDivider>Images</FormHeaderDivider>

          <div className="flex flex-col gap-2">
            <input
              multiple={true}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="hidden aria-hidden"
              id="image-upload"
              {...imagesField}
              onChange={(e) => {
                onImageChange(e);
              }}
            />
            <label
              htmlFor="image-upload"
              className={`${areImages ? "hidden" : ""} w-full flex items-center flex-col gap-4 py-8 px-4 bg-transparent text-[var(--ion-background-color-step-300)] ion-border-radius border-[var(--ion-background-color-step-300)] border-2 border-dashed`}
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
            className={`${isErrorInput(Boolean(errors.description))}`}
          />

          <div className="relative flex flex-row gap-2">
            <IonInput
              type="search"
              fill="outline"
              label="Address"
              labelPlacement="floating"
              debounce={500}
              onIonInput={(ev) => handleSearchInput(ev)}
              errorText={errors.address?.message ? errors.address.message : ""}
              className={`${isErrorInput(Boolean(errors.address))}`}
              {...register("address")}
            ></IonInput>

            <IonButton
              aria-label="Open Map Modal"
              id={selectLocationModalId}
              expand="block"
              color={"dark"}
              className="w-14"
            >
              <IonIcon slot="icon-only" icon={map} />
            </IonButton>
            {/* autocomplete results */}
            <IonList
              className="absolute transform -translate-y-1/2 -translate-x-1/2 top-[110%] w-full max-h-[200px] overflow-y-auto shadow-lg z-10 ion-border-radius"
              lines="full"
            >
              {searchResults.map((result) => (
                <IonItem
                  key={result.osm_id}
                  button={true}
                  onClick={() => {
                    setValue("address", result.display_name);
                    setSearchResults([]);
                  }}
                >
                  <IonLabel>{result.display_name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <SelectLocationModal
              modalId={selectLocationModalId}
              onDismiss={() => {}}
              onConfirm={(selectedArea, selectedPosition) => {
                console.log(
                  "selectedArea, selectedPosition:",
                  selectedArea,
                  selectedPosition
                );
              }}
            />
          </div>

          <IonSelect
            multiple={true}
            placeholder="Select Conditions"
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Conditions"
            labelPlacement="floating"
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
            placeholder="Needed Equipment"
            cancelText="Cancel"
            okText="Okay"
            fill="outline"
            label="Equipment"
            labelPlacement="floating"
            className={`${isErrorInput(Boolean(errors.equipment))}`}
          >
            {equipments &&
              equipments.map((equipment) => (
                <IonSelectOption key={equipment.name} value={equipment.name}>
                  {capitalizeFirstLetter(equipment.name)}
                </IonSelectOption>
              ))}
          </IonSelect>

          <FormHeaderDivider>Additional Info</FormHeaderDivider>
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
          <div>
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
            <label className="absolute text-xs -top-2 label-text-wrapper">
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
            <IonButton
              color={"dark"}
              shape="round"
              fill="solid"
              size="small"
              className="whitespace-nowrap"
            >
              Check In
              <IonIcon slot="end" icon={location} />
            </IonButton>
            <IonButton
              color={"dark"}
              fill="clear"
              // size="small"
              // className="ml-auto"
            >
              <IonIcon slot="icon-only" icon={helpCircleOutline} />
            </IonButton>
          </div>

          <div className="flex items-center justify-between mt-8 ">
            <IonButton fill="outline" color={"danger"} className="">
              Cancel
            </IonButton>
            <IonButton type="submit" color={"primary"} className="font-bold">
              Confirm
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddLocation;
