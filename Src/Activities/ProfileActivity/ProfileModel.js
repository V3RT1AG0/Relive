// @flow
import Realm from "realm";

const GroupTagSchema = {
    name: "GroupTag",
    properties: {
        _id: "string",
        name: "string",
        dp: "string"
    }
};

const UserTagSchema = {
    name: "UserTag",
    properties: {
        _id: "string",
        name: "string",
        dp: "string"
    }
};

const UserSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
        _id: "string",
        name: "string",
        phone: "string",
        dp: "string",
        userid: {type: "UserTag[]", default: []},
        groupTagId: {type: "GroupTag[]", default: []},
        timestamp: "string",
        password: "string?"
    }
};

export const UserRealm = new Realm({
    path: "User.realm",
    schema: [UserSchema, UserTagSchema, GroupTagSchema]
});
