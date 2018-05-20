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
        _id: "string",
        name: "string",
        userId: "User",
        groupTagId: "Grouptag",
        photoId: "Photo",
    }
};


const TimeLineSchema = {
    name: "TimeLine",
    primaryKey: "_id",
    properties: {
        _id: "string",
        name: "string",
        phone: "string",
        groupTagId: {type: "string[]", default: []},
        userid: {type: "string[]", default: []},
        album: {type: "Album[]", default: []},
        dp: "string",
        timestamp: "string"
    }
};

export default new Realm({
    path: "Timeline.realm",
    schema: [TimeLineSchema, AlbumSchema,UserSchema,GrouptagSchema,PhotoSchema]
});

//TODO remove subalbum schema
