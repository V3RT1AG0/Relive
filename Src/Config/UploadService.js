// @flow
import {
	ADD_ALBUM,
	IMAGE_UPLOADED,
	SERVER_URL,
	ADD_SELECTED_PHOTO
} from "./Constants";
import { Platform } from "react-native";
import Upload from "react-native-background-upload";
import Axios from "axios";
import RNGRP from "react-native-get-real-path";
const axios = Axios.create();
export const startInsertingImages = (Images, AlbumId) => {
	uploadImage(Images, AlbumId, 0);
	console.log(Images, "tota");
	//startInsertingImages2(Images, AlbumId);
};

const uploadImage = (Images, AlbumId, index) => {
	console.log(index);
	if (!(index < Images.length)) {
		console.log("return", index, Images.length);
		return;
	}

	const image = Images[index];
	console.log("IMage upload started for image=>", image);
	console.log("albumID" + AlbumId);
	RNGRP.getRealPathFromURI(image.src).then(filePath => {
		const type = image.mime;
		const uri = filePath;
		const name = image.path; //TODO:get filename here if required
		let key;

		axios
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
							console.log("Completed!");
							const payload = {
								url: key, //photo url
								AlbumId
							};
							uploadImage(Images, AlbumId, index + 1);
							axios({
								data: payload,
								url: SERVER_URL + "/photos/notifyImageUpload",
								method: "post"
							})
								.then(() => {
									//this does not get triggerd for some unknown reason and I assume becasue of this image upload is retried hence duplicate image
									console.log("Image uploaded");
								})
								.catch(e => {
									console.log(e);
								});
						});
					})
					.catch(err => {
						console.log("Upload error!", err);
					});
			});
	});
};

export const startInsertingImagesaasdasd = (Images, AlbumId) => {
	Images.forEach(image => {
		console.log("IMage upload started for image=>", image);
		//for each image perform the following actions
		console.log("albumID" + AlbumId);
		const type = image.mime;
		const uri = image.src;
		/* Platform.OS === "android"
                ? image.path.replace("file://", "")
                : image.path; */
		const name = image.path; //TODO:get filename here if required
		let key;
		axios
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
							console.log("Completed!");
							const payload = {
								url: key, //photo url
								AlbumId
							};
							axios({
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

const startInsertingImages2 = (Images, subAlbumId) => {
	Images.forEach(image => {
		//for each image perform the following actions
		console.log(image);
		const type = image.mime;
		const uri = image.path;
		const name = image.path; //TODO:get filename here if required
		let key;
		axios
			.post(SERVER_URL + "/photos/getPreSignedURL", {
				//get url from node.js along with key or filename
				type
			})
			.then(({ data }) => {
				console.log(data);
				key = data.Key;
				return axios({
					//upload image using signed url
					url: data.url,
					data: {
						uri,
						type,
						name
					},
					method: "put",
					headers: {
						"Content-Type": type,
						"x-amz-acl": "public-read"
						//"x-amz-server-side-encryption": "AES256"
					},
					transformRequest: [
						(data, headers) => {
							delete headers.common.Authorization;
							return data;
						}
					]
				});
			})
			.then(success => console.log(success))
			.catch(error => console.log(error.response));
	});
};
