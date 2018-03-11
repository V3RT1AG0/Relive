// @flow
import realm from "./GalleryModels";
import { SERVER_URL, INITIAL_PHOTOS } from "../../Config/Constants";
import axios from "axios";

const loadPhotosAC = data => ({
	type: INITIAL_PHOTOS,
	data
});

export const loadInitialPhotosfromRealm = subAlbumId => dispatch => {
	const Photos = realm.objects("Photos");
	let latestPhotoId = "000000000000000000000000";
	console.log(Photos.length);
	if (Photos.length !== 0) latestPhotoId = Photos.sorted("_id", true)[0]._id;
	//TODO maybe the listner needs to be removed when closing the activity
	realm.addListener("change", () => {
		console.log("data changed" + Photos);
		dispatch(loadPhotosAC(Photos));
	});

	dispatch(loadPhotosAC(Photos));
	fetchNewPhotosDataFromNetwork(subAlbumId, latestPhotoId);
};

const fetchNewPhotosDataFromNetwork = (subAlbumId, latestPhotoId) => {
	//in production this will only fetch updated data
	axios
		.get(
			SERVER_URL + "album/getSubAlbumPhotos/" + subAlbumId + "/" + latestPhotoId
		)
		.then(result => {
			console.log("fetchfromnetwork", result);
			const newPhotos = result.data.photoId;
			newPhotos.forEach(Photo => addNewPhotoToRealm(Photo));
		})
		.catch(error => console.log(error.response));
};

const addNewPhotoToRealm = newPhoto => {
	//call using foEACH and remove forEach here
	try {
		//this will trigger the listener
		realm.write(() => {
			const Photos = realm.create("Photos", newPhoto);
			console.log("Realm" + Photos._id);
		});
	} catch (e) {
		console.log("Error on creation", e);
	}
};
