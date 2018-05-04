// @flow
import { ADD_ALBUM, SERVER_URL } from "../../Config/Constants";
import axios from "axios";
import { UploadRealm } from "./UploadModel";

//triggered whenever a new photo is added to existing album or new album is created
export const insertAlbum = album => ({
	type: ADD_ALBUM,
	album
});

export const createNewAlbumOrSubAlbum = (payload, path) =>
	axios({
		data: payload,
		url: SERVER_URL + path,
		method: "post"
	});

/* export const createAlbum = (payload, selectedImages, navigator) => dispatch => {
	createNewAlbumOrSubAlbum(payload, "/album/createAlbum")
		.then(({ data }) => {
			const { AlbumId } = data;
			navigator.push({
				screen: "UploadProgress",
				passProps: { AlbumId }
			});
			console.log(" AlbumID1" + AlbumId + "length" + selectedImages.length);
			loadAlbumToUploadToRealm(AlbumId, payload.album_name, selectedImages);
		})
		.catch(error => console.log(error.response));
}; */

// ADD PHOTOS TO TO ALBUM ALREADY CREATED
export const addPhotosToRealm = (albumId, images) =>
	new Promise((resolve, reject) => {
		const Album = UploadRealm.objectForPrimaryKey("Album", albumId);
		try {
			UploadRealm.write(() => {
				images.forEach(item => {
					Album.photos.push(item);
				});
			});
			resolve("success");
		} catch (e) {
			console.log(e);
			reject(e);
		}
	});

export const loadAlbumToRealm = (_id, name, imagesArray) => {
	console.log(imagesArray, "imagesAray");
	UploadRealm.write(() => {
		const Album = UploadRealm.create("Album", {
			name,
			_id,
			photos: []
		});
		imagesArray.forEach(image => {
			Album.photos.push(image);
		});
	});
};
