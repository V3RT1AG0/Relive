// @flow
import realm from "./TimeLineModel";
import { MY_ID, SERVER_URL, INITIAL_TIMELINE } from "../../Config/Constants";
import axios from "axios";

const loadTimelineWithDataAC = data => ({
	type: INITIAL_TIMELINE,
	data
});

export const loadInitialTimelinefromRealm = () => {
	const albums = realm.objects("Album");
	let latestAlbumId = "000000000000000000000000";
	console.log(albums.length);
	if (albums.length !== 0) latestAlbumId = albums.sorted("_id", true)[0]._id;
	//TODO maybe the listner needs to be removed when closing the activity
	/*realm.addListener("change", () => {
		console.log("data changed" + albums);
		dispatch(loadTimelineWithDataAC(albums));
	});*/

	//dispatch(loadTimelineWithDataAC(albums));
	fetchNewTimelineDataFromNetwork(latestAlbumId);
};

const fetchNewTimelineDataFromNetwork = latestAlbumId => {
	//in production this will only fetch updated data
	axios
		.get(
			SERVER_URL + "/user/getUserAndTimelineData/" + MY_ID + "/" + latestAlbumId
		)
		.then(result => {
			console.log("fetchfromnetwork", result);
			const newAlbums = result.data.album;
			newAlbums.forEach(album => addNewAlbumToRealm(album));
		})
		.catch(error => console.log(error.response));
};

const addNewAlbumToRealm = newAlbum => {
	//call using foEACH and remove forEach here
	console.log(newAlbum)
	try {
		//this will trigger the listener
		realm.write(() => {
			const timeline = realm.create("Album", newAlbum);
			console.log("Realm" + timeline._id);
		});
	} catch (e) {
		console.log("Error on creation",e);
	}
};
