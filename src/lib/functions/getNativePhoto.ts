import {Camera, Photo, ImageOptions} from "@capacitor/camera";

//https://capacitorjs.com/docs/apis/camera
const getNativePhoto = async (options: ImageOptions) => {
    const hasPermission = await Camera.checkPermissions();
    let images: Photo | null = null
    if (
        hasPermission.camera === "granted"
    ) {
        images = await Camera.getPhoto(options)
    }
    return images;
};
export default getNativePhoto;
