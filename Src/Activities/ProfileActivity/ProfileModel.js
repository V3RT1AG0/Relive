// @flow
import Realm from "realm";

const UserSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
        _id: "string",
        name: "string",
        phone: "string",
        dp: "string",
        userid: {type: "string[]", default: []},
        groupTagId: {type: "string[]", default: []}
    }
};

export const UserRealm = new Realm({
    path: "User.realm",
    schema: [UserSchema]
});
