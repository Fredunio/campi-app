import { Camera, GalleryImageOptions, GalleryPhotos } from "@capacitor/camera";

//https://capacitorjs.com/docs/apis/camera
const pickNativeImages = async (options: GalleryImageOptions) => {
  const hasPermission = await Camera.checkPermissions();
  let images: GalleryPhotos | null = null;
  if (hasPermission.photos === "granted") {
    images = await Camera.pickImages(options);
  }
  return images;
};
export default pickNativeImages;
