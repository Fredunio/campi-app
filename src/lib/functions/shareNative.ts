import { Share, ShareOptions } from "@capacitor/share";

//https://capacitorjs.com/docs/apis/share

/**
 * Share content using the native sharing Api
 * Remember to check if the platform/browser supports sharing api with Share.canShare()
 * e.g firefox does not support sharing api, but edge do
 * @param options  - ShareOptions object
 * @returns ShareResult
 */

export async function shareNative(options: ShareOptions) {
  return await Share.share(options);
}

//await Share.share({
//    title: 'See cool stuff',
//    text: 'Really awesome thing you need to see right meow',
//    url: 'http://ionicframework.com/',
//    dialogTitle: 'Share with buddies',
//    // files: []
//});

// Share local file using url parameter

//const photo = await Camera.getPhoto(options);
//await Share.share({
//    url: photo.path,
//});

// Share multiple files using files parameter
//const {photos} = await Camera.pickImages(options);
//await Share.share({
//    files: photos.map(photo => photo.path!),
//});
