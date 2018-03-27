// @flow
import Realm from "realm";

const PhotosSchema = {
	name: "Photos",
	properties: {
		_id: "string",
		uri: "string",
		uploaded: "bool"
	}
};

const AlbumSchema = {
	name: "Album",
	properties: {
		name: "string",
		_id: "string",
		pendingPhotos: "Photos[]"
	}
};

export default new Realm({
	path: "Upload.realm",
	schema: [AlbumSchema, PhotosSchema]
});
