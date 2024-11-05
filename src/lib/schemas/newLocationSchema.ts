import {
  IMAGE_EXTENSIONS,
  MAX_LOCATION_IMAGES,
  MAX_LOCATION_IMAGES_SIZE_BYTES,
} from "@/lib/constants";
import { getFileExtension } from "@/utils/helpers";
import * as yup from "yup";

export const newLocationSchema = yup.object().shape({
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
      message: `Files too big, can't exceed ${MAX_LOCATION_IMAGES_SIZE_BYTES}`,
      test: (fileArray) => {
        if (!(fileArray instanceof Array)) {
          return false;
        }
        const imagesSize = fileArray.reduce((acc, file) => {
          return acc + file.size;
        }, 0);
        return imagesSize < MAX_LOCATION_IMAGES_SIZE_BYTES;
      },
    })
    .test({
      message: `Limit of ${MAX_LOCATION_IMAGES} images exceeded`,
      test: (fileArray) => {
        if (!(fileArray instanceof Array)) {
          return false;
        }
        return fileArray.length <= MAX_LOCATION_IMAGES;
      },
    }),

  description: yup.string().required(),
  address: yup.string().required(),
  conditions: yup.array().of(yup.string()).optional(),
  features: yup.array().of(yup.string()).optional(),
  equipments: yup.array().of(yup.string()).optional(),
  tagInput: yup.string().optional(),
  tags: yup.array().of(yup.string()).optional(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
  checkedIn: yup.boolean().optional(),
});
