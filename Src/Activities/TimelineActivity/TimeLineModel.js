// @flow
import Realm from "realm";

export const SubAlbumSchema = {
	name: "SubAlbum",
	properties: {
		userId: "string[]",
		groupTagId: "string[]"
	}
};
const AlbumSchema = {
	name: "Album",
	properties: {
		name: "string"
	}
};

//this is same as album array in mongoDB
const TimeLineSchema = {
	name: "TimeLine",
	properties: {
		subAlbumIds: "SubAlbum[]",
		albumId: "Album",
		_id: "string"
	}
};

export default new Realm({
	path: "Timeline.realm",
	schema: [TimeLineSchema, AlbumSchema, SubAlbumSchema]
});
