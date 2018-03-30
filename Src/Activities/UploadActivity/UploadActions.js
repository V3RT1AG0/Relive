// @flow
import { createAlbum } from "./UploadUtils";

//payload contains album details and images is array of images to upload
export const startUploadingPhotos = (
	payload,
	images,
	navigator
) => dispatch => {
	console.log("load initial photos action called");
	dispatch(createAlbum(payload, images, navigator));
};
