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

const TimeLineSchema = {
	name: "TimeLine",
	properties: {
		subAlbumIds: "SubAlbum[]",
		albumId: "Album",
		_id: "string"
	}
};

export default new Realm({
	schema: [TimeLineSchema, AlbumSchema, SubAlbumSchema]
});
