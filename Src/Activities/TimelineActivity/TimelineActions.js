// @flow
import { INITIAL_TIMELINE, MY_ID, SERVER_URL } from "../../Config/Constants";
import {
	TimeLineSchema,
	AlbumSchema,
	SubAlbumSchema
} from "../../Config/RealmModels";
import Realm from "realm";
import axios from "axios";

const loadInitialTimeline = data => ({
	type: INITIAL_TIMELINE,
	data
});

const fetchTimelineInitialData = () => dispatch => {
    //in production this will only fetch updated data
	axios
		.get(SERVER_URL + "user/getUserAndTimelineData/" + MY_ID)
		.then(result => {
			console.log(result);
			addInitialTimelinetoRealm(result.data.album);
		})
		.catch(error => console.log(error.response));
};

const addInitialTimelinetoRealm = data => {
	Realm.open({ schema: [TimeLineSchema, AlbumSchema, SubAlbumSchema] })
		.then(realm => {
			realm.write(() => {
				console.log(data);
				data.forEach(album => {
					const timeline = realm.create("TimeLineSchema", album);
					console.log("Realm" + timeline._id);
				});
			});
		})
		.catch(console.log);
};

const loadInitialTimelinefromRealm = () => dispatch => {
	Realm.open({ schema: [TimeLineSchema, AlbumSchema, SubAlbumSchema] })
		.then(realm => {
			const albums = realm.objects("TimeLineSchema");
			realm.addListener("change", () => {
				console.log("data changed" + albums);
				dispatch(loadInitialTimeline(albums));
			});
			console.log("realm data loaded", albums);
			dispatch(loadInitialTimeline(albums));
			dispatch(fetchTimelineInitialData());
		})
		.catch(console.log);
};

export const loadInitialTimelineAC = () => dispatch => {
	console.log("action called")
	dispatch(loadInitialTimelinefromRealm());
};
