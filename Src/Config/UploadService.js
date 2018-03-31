// @flow
import {
	ADD_ALBUM,
	IMAGE_UPLOADED,
	SERVER_URL,
	ADD_SELECTED_PHOTO
} from "./Constants";
import Upload from "react-native-background-upload";
import axios from "axios";
export const startInsertingImages = (Images, AlbumId) => {
	uploadImage(Images, AlbumId, 0);
};

const uploadImage = (Images, AlbumId, index) => {
	if (!index < Images.length) return;
	const image = Images[index];
	console.log("IMage upload started for image=>", image);
	console.log("albumID" + AlbumId);
	const type = image.mime;
	const uri = image.src;
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
						}).then(() => {
							uploadImage(Images, AlbumId, index++);
						});
					});
				})
				.catch(err => {
					console.log("Upload error!", err);
				});
		});
};

export const startInsertingImagesa = (Images, AlbumId) => {
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