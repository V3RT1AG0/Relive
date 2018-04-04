// @flow
import Realm from "realm";

const Author = {
	name: "Author",
	properties: {
		_id: "string",
		name: "string"
	}
};

const Messages = {
	name: "Messages",
	primaryKey: "_id",
	properties: {
		deleted: "string[]",
		read: "string[]",
		_id: "string",
		author: "Author",
		text: "string"
	}
};

const ChatList = {
	name: "ChatList",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string",
		count: "int",
		offset: "string",
		messages: { type: "Messages[]", default: [] }
	}
};

export const ChatRealm = new Realm({
	path: "Chat.realm",
	schema: [ChatList, Messages, Author]
});
