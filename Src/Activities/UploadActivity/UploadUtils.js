// @flow
import realm from "./UploadModel";
import { ADD_ALBUM, SERVER_URL, IMAGE_UPLOADED } from "../../Config/Constants";
import axios from "axios";

//triggered whenever a new photo is added to existing album or new album is created
export const insertAlbum = album => ({
	type: ADD_ALBUM,
	album
});

createNewAlbumOrSubAlbum = (payload, path) =>
	axios({
		data: payload,
		url: SERVER_URL + path,
		method: "post"
	});

startInsertingImages = (Images, AlbumId) => {
	Images.forEach(image => {
		//for each image perform the following actions
		console.log("albumID" + AlbumId);
		const type = image.mime;
		const uri = image.src;
		/* Platform.OS === "android"
                ? image.path.replace("file://", "")
                : image.path; */
		const name = image.path; //TODO:get filename here if required
		let key;
		this.axios
			.post(SERVER_URL + "/photos/getPreSignedURL", {
				//get url from node.js along with key or filename
				type
			})
			.then(({ data }) => {
				key = data.Key;
				const options = {
					url: data.url,
					path: uri,
					method: "PUT",
					type: "raw",
					field: "uploaded_media",
					headers: {
						"Content-Type": type,
						"x-amz-acl": "public-read"
					},
					notification: {
						enabled: true
					}
				};

				Upload.startUpload(options)
					.then(uploadId => {
						console.log("Upload started");
						Upload.addListener("progress", uploadId, data => {
							console.log(`Progress: ${data.progress}%`);
						});
						Upload.addListener("error", uploadId, data => {
							console.log(`Error: ${data.error}%`);
						});
						Upload.addListener("cancelled", uploadId, data => {
							console.log(`Cancelled!`);
						});
						Upload.addListener("completed", uploadId, data => {
							// data includes responseCode: number and responseBody: Object
							console.log(data);
							console.log("Completed!");
							const payload = {
								url: key, //photo url
								AlbumId
							};
							return this.axios({
								data: payload,
								url: SERVER_URL + "/photos/notifyImageUpload",
								method: "post"
							});
						});
					})
					.catch(err => {
						console.log("Upload error!", err);
					});
			});
	});
};

export const createAlbum = (payload, selectedImages) => dispatch => {
	createNewAlbumOrSubAlbum(payload, "/album/createAlbum")
		.then(({ data }) => {
			const { AlbumId } = data;
			console.log(" AlbumID1" + AlbumId + "length" + selectedImages.length);
			loadAlbumToUploadToRealm(AlbumId, payload.album_name, selectedImages);
			//this.startInsertingImages(this.selectedImages, AlbumId);
			//this.setState({ image: [] });
		})
		.catch(error => console.log(error.response));
};

const loadAlbumToUploadToRealm = (_id, name, imagesArray) => {
	console.log(imagesArray, "imagesAray");
	realm.write(() => {
		const Album = realm.create("Album", {
			name,
			_id,
			photos: []
		});
		imagesArray.forEach(image => {
			Album.photos.push(image);
		});
	});
	/* const Album = realm.objects("Album");
	console.log(Album.length);
	Album.addListener((Photos, changes) => {
		console.log(changes + "changes");
		const PhotosArray = [];
		changes.insertions.forEach(index => {
			PhotosArray.push(Photos[index]);
		});
		//setup update listener here
		dispatch(addNewPhotosAC(PhotosArray));
	}); */

	/* dispatch(loadPhotosAC(Photos));
	fetchNewPhotosDataFromNetwork(AlbumId, latestPhotoId);*/
};
