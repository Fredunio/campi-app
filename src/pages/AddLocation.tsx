import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import GoBackHeader from "../components/Layout/Headers/GoBackHeader/GoBackHeader";
import { add, closeCircle, imagesOutline, map } from "ionicons/icons";
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
} from "../lib/helpers";
import FormErrorText from "../components/Layout/Forms/FormErrorText";
import FormPreviewImages from "../components/Layout/Forms/FormPreviewImages";
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "../lib/variables";

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
  conditions: yup.array().of(yup.string()).required(),
  equipment: yup.array().of(yup.string()).required(),
  tagInput: yup.string().notRequired(),
  tags: yup.array().of(yup.string()).required(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
});

type TNewLocationInputsSchema = yup.InferType<typeof NewLocationInputsSchema>;

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
      console.log("newImagesArr: ", newImagesArr);

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

      console.log("updatedImages: ", updatedImages);

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

  const imagesField = register("images", { required: true });

  const tags = watch("tags");
  console.log(errors);

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
            <IonSelectOption value="1">Category 1</IonSelectOption>
            <IonSelectOption value="2">Category 2</IonSelectOption>
            <IonSelectOption value="3">Category 3</IonSelectOption>
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
            <IonSelectOption value="1">Type 1</IonSelectOption>
            <IonSelectOption value="2">Type 2</IonSelectOption>
            <IonSelectOption value="3">Type 3</IonSelectOption>
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
            <IonSelectOption value="1">Size 1</IonSelectOption>
            <IonSelectOption value="2">Size 2</IonSelectOption>
            <IonSelectOption value="3">Size 3</IonSelectOption>
          </IonSelect>

          <div className="flex flex-col gap-2">
            <input
              multiple={true}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="hidden aria-hidden"
              id="image-upload"
              {...imagesField}
              onChange={(e) => {
                // imagesField.onChange(e);
                onImageChange(e);
              }}
            />
            <label
              htmlFor="image-upload"
              // onClick={() => {
              //   document.getElementById("image-upload")?.click();
              // }}
              className="w-full flex items-center flex-col gap-4 py-8 px-4 bg-transparent text-[var(--ion-background-color-step-300)] rounded-[4px] border-[var(--ion-background-color-step-300)] border-2 border-dashed"
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

          <div className="flex flex-row gap-2">
            <IonInput
              type="text"
              fill="outline"
              label="Address"
              labelPlacement="floating"
              errorText={errors.address?.message ? errors.address.message : ""}
              className={`${isErrorInput(Boolean(errors.address))}`}
            />

            <IonButton color={"dark"} className="w-14">
              <IonIcon slot="icon-only" icon={map} />
            </IonButton>
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
            <IonSelectOption value="1">Condition 1</IonSelectOption>
            <IonSelectOption value="4">Condition 4</IonSelectOption>
            <IonSelectOption value="5">Condition 5</IonSelectOption>
            <IonSelectOption value="6">Condition 6</IonSelectOption>
            <IonSelectOption value="7">Condition 7</IonSelectOption>
            <IonSelectOption value="8">Condition 8</IonSelectOption>
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
            <IonSelectOption value="1">Equipment 1</IonSelectOption>
            <IonSelectOption value="4">Equipment 4</IonSelectOption>
            <IonSelectOption value="5">Equipment 5</IonSelectOption>
            <IonSelectOption value="6">Equipment 6</IonSelectOption>
            <IonSelectOption value="7">Equipment 7</IonSelectOption>
            <IonSelectOption value="8">Equipment 8</IonSelectOption>
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
            className="flex flex-row items-center gap-10  mt-2 rounded-[4px] border-[var(--ion-background-color-step-300)] border-1 border-solid px-4 py-[18px]"
          >
            <label className="label-text-wrapper ">
              <div className="label-text">Visibility:</div>
            </label>

            <IonRadio
              defaultChecked={true}
              value="public"
              {...register("visibility")}
            >
              Public
            </IonRadio>
            <IonRadio {...register("visibility")} value="private">
              Private
            </IonRadio>
          </IonRadioGroup>

          <div className="flex items-center justify-between mt-8">
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
