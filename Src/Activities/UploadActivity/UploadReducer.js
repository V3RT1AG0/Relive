// @flow
import {
	ADD_ALBUM,
	IMAGE_UPLOADED,
	SERVER_URL,
	ADD_SELECTED_PHOTO
} from "../../Config/Constants";
import Upload from "react-native-background-upload";
import axios from "axios";
const startInsertingImages = (Images, AlbumId) => {
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
							console.log(data);
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

const GalleryReducer = (state = [], action) => {
	//this state is nothing but an array of albums currently in upload which contains array of photos
	switch (action.type) {
		case ADD_ALBUM:
			return (state = [...state, action.album]);
		case ADD_SELECTED_PHOTO: {
			const updatedItems = state.map(item => {
				if (item._id === action.albumId) {
					return { ...item, photos: [...item.photos, ...action.photos] };
				}
				return item;
			});
			//startInsertingImages(action.photos, action.albumId);
			return (state = [...updatedItems]);
		}
		case IMAGE_UPLOADED:
			return (state = [...state, ...action.data]);
		default:
			return state;
	}
};

export default GalleryReducer;

//	const newAlbums = action.albums.filter(f => !state.includes(f));
/* if (!state.includes(action.album)) {
				startInsertingImages(action.album.photos, action.album._id);
				return (state = [...state, action.album]);
			}
			else
			{
				startInsertingImages(action.album.photos, action.album._id);
				console.log("returned same state");
				const updatedItems = state.map(item => {
					if(item._id === action.album._id){
					  return { ...item, photos:[...action.album.photos] }
					}
					return item
				  })
				return (state = [...updatedItems]); 
			}*/
//startInsertingImages(action.album.photos, action.album._id);

// if album already exist update the images. i.e if insert listener is triggered when data is entered in photos array which is not yet confiremd
