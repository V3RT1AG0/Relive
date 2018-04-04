// @flow
import { SERVER_URL } from "../../Config/Constants";
import socket from "../../Config/SocketConfig";
import axios from "axios";
import { ChatRealm } from "../ChatMainActivity/ChatModel";

export const fetchNewChatListFromNetwork = (userID, chatList) => {
	let latestChatItem = "000000000000000000000000";
	if (chatList.length !== 0)
		latestChatItem = chatList.sorted("_id", true)[0]._id;

	return axios
		.post(SERVER_URL + "/api/chat/getlist")
		.then(result => {
			console.log("fetchfromnetwork", result);
			/* const newConversations = result.data.chatlist.filter(
				item => item._id > latestChatItem
			);
			const modifiedConversation = result.data.chatlist.filter(
				item => item.count > 0
			); */

			return putNewConversationsToRealm(result.data.chatList);
		})
		.catch(error => console.log(error.response));
};

export const putNewConversationsToRealm = Conversations =>
	new Promise((resolve, reject) => {
		try {
			/* ChaltListRealm.write(() => {
				newConversations.forEach(item => {
					ChaltListRealm.create("ChatList", {
						item
					});
				});

				modifiedConversation.forEach(item => {
					const oldConversation = ChaltListRealm.objectForPrimaryKey("ChatList", item._id);
					old
				}); */
			ChatRealm.write(() => {
				Conversations.forEach(item => {
					ChatRealm.create(
						"ChatList",
						{
							item
						},
						true
					);
				});
			});
			resolve("success");
		} catch (e) {
			console.log(e);
			reject(e);
		}
	});

/* export const setUpSocketforConversationUpdates = AlbumId => {
	const Album = ChaltListRealm.objectForPrimaryKey("Album", AlbumId);
	socket.on("Photo", photo => {
		console.log("PhotoFromSocket", photo);
		try {
			GalleryRealm.write(() => {
				Album.photos.push(photo);
			});
		} catch (e) {
			console.log("Error on creation", e);
		}
	});
}; */
