// @flow
import Realm from "realm";

const PhotosSchema = {
    name: "Photos",
    primaryKey: "_id",
    properties: {
        _id: "string",
        url: "string",
        uploadDate: "date"
    }
};

const AlbumSchema = {
    name: "Album",
    primaryKey: "_id",
    properties: {
        _id: "string",
        owner: "string",
        userId: "string[]",
        groupTagId: "string[]",
        photos: { type: "Photos[]", default: [] }
    }
};

export const GalleryRealm = new Realm({
    path: "Gallery.realm",
    schema: [AlbumSchema, PhotosSchema]
});
