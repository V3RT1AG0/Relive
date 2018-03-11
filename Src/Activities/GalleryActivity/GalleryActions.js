// @flow
import { loadInitialPhotosfromRealm } from "./GalleryUtils";

export const loadInitialPhotos = subAlbumId => dispatch => {
	console.log("load initial photos action called");
	dispatch(loadInitialPhotosfromRealm(subAlbumId));
};
