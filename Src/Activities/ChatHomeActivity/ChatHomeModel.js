// @flow
import Realm from "realm";

const ChatList = {
	name: "ChatList",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string",
		count: "int",
		offset: "string"
	}
};

export const ChaltListRealm = new Realm({
	path: "ChatList.realm",
	schema: [ChatList]
});