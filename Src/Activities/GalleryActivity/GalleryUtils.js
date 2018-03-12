// @flow
import realm from "./GalleryModels";
import { SERVER_URL, INITIAL_PHOTOS, ADD_PHOTOS } from "../../Config/Constants";
import socket from "../../Config/SocketConfig";
import axios from "axios";

const loadPhotosAC = data => ({
	type: INITIAL_PHOTOS,
	data
});

const addNewPhotosAC = data => ({
	type: ADD_PHOTOS,
	data
});

const addSinglePhoto = photo => ({
	type: ADD_PHOTOS,
	photo
});

export const loadInitialPhotosfromRealm = subAlbumId => dispatch => {
	const Photos = realm.objects("Photos");
	let latestPhotoId = "000000000000000000000000";
	console.log(Photos.length);
	if (Photos.length !== 0) latestPhotoId = Photos.sorted("_id", true)[0]._id;
	//TODO maybe the listner needs to be removed when closing the activity
	/* realm.addListener("change", () => {
		console.log("data changed" + Photos);
		dispatch(loadPhotosAC(Photos));
	}); */
	Photos.addListener((Photos, changes) => {
		console.log(changes);
		const PhotosArray = [];
		changes.insertions.forEach(index => {
			PhotosArray.push(Photos[index]);
		});
		if (PhotosArray.length !== 0) dispatch(addNewPhotosAC(PhotosArray));
	});

	dispatch(loadPhotosAC(Photos));
	fetchNewPhotosDataFromNetwork(subAlbumId, latestPhotoId);
};

const fetchNewPhotosDataFromNetwork = (subAlbumId, latestPhotoId) => {
	//in production this will only fetch updated data
	axios
		.get(
			SERVER_URL +
				"/album/getSubAlbumPhotos/" +
				subAlbumId +
				"/" +
				latestPhotoId
		)
		.then(result => {
			console.log("fetchfromnetwork", result);
			const newPhotos = result.data.photoId;
			//newPhotos.forEach(Photo => addNewPhotoToRealm(Photo));
			addNewPhotoToRealm(newPhotos, subAlbumId);
		})
		.catch(error => console.log(error.response));
};

const addNewPhotoToRealm = (newPhotos, subAlbumId) => {
	//call using foEACH and remove forEach here
	try {
		//this will trigger the listener
		realm.write(() => {
			newPhotos.forEach(newPhoto => {
				const Photos = realm.create("Photos", newPhoto);
				console.log("Realm" + Photos._id);
			});
		});
		setUpSocketforImageUpdates(subAlbumId);
	} catch (e) {
		console.log("Error on creation", e);
	}
};

const setUpSocketforImageUpdates = subAlbumId => {
	socket.emit("enterSubAlbum", subAlbumId);
	socket.on("Photo", photo => {
		console.log("PhotoFromSocket", photo);

		try {
			realm.write(() => {
				realm.create("Photos", photo);
			});
		} catch (e) {
			console.log("Error on creation", e);
		}
	});
};
