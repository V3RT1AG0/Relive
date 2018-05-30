// @flow
import Realm from "realm";


const UserSchema = {
    name: "User",
    properties: {
        _id: "string",
        name: "string",
    }
};

const GrouptagSchema = {
    name: "Grouptag",
    properties: {
        _id: "string",
        name: "string",
    }
};

const PhotoSchema = {
    name: "Photo",
    properties: {
        _id: "string",
        url: "string",
    }
};

const AlbumSchema = {
    name: "Album",
    properties: {
        timestamp:"string",
        _id: "string",
        name: "string",
        userId: "User[]",
        groupTagId: "Grouptag[]",
        photoId: "Photo[]",
    }
};



export default new Realm({
    path: "Timeline.realm",
    schema: [AlbumSchema,UserSchema,GrouptagSchema,PhotoSchema]
});
