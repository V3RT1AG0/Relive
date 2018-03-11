// @flow
import Realm from "realm";

const SubAlbumSchema = {
	name: "Sub",
	properties: {
		owner: "string",
		userId: "string[]",
		groupTagId: "string[]",
		photoId: "string[]",
		pendingPhotos: "Photos[]"
	}
};

const PhotosSchema = {
	name: "Photos",
	properties: {
		_id: "string",
		url: "string",
		uploadDate: "date"
	}
};

export default new Realm({
	path: "Gallery.realm",
	schema: [SubAlbumSchema, PhotosSchema]
});
