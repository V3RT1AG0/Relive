// @flow

import realm from "../UploadModel";
import axios from "axios";
import { ADD_SELECTED_PHOTO } from "../../../Config/Constants";

const addPhotosToExistingAlbum = (albumId, photos) => ({
	type: ADD_SELECTED_PHOTO,
	photos,
	albumId
});
//payload contains album details and images is array of images to upload
export const addImagesToExistingAlbum = (albumId, images) => dispatch => {
	addPhotosToRealm(albumId, images);
	console.log("addPhotosToExistigAlbum");
	dispatch(addPhotosToExistingAlbum(albumId, images));
};

const addPhotosToRealm = (albumId, images) => {
	//const Albums= realm.objects("Album").filtered("_id = " + albumId);
	console.log(albumId);
	const Album = realm.objectForPrimaryKey("Album", albumId);
	console.log(Album, albumId);
	try {
		realm.write(() => {
			images.forEach(item => {
				Album.photos.push(item);
			});
		});
	} catch (e) {
		console.log(e);
	}
};
