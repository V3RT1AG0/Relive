// @flow
import Realm from "realm";

const PhotosSchema = {
	name: "Photos",
	properties: {
		src: "string",
		uploaded: { type: "bool", default: false },
		mime: "string"
	}
};

const AlbumSchema = {
	name: "Album",
	properties: {
		name: "string",
		_id: "string",
		photos: "Photos[]"
	}
};

export default new Realm({
	path: "Upload.realm",
	schema: [AlbumSchema, PhotosSchema]
});
