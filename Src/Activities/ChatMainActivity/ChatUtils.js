// @flow
import { SERVER_URL } from "../../Config/Constants";
import axios from "axios";
import { ChatRealm } from "./ChatModel";

export const sendMessageToServer = (chatid, message) => {
	const url = SERVER_URL + "/api/chat/add";
	const data = {
		chatid,
		message
	};
	return axios({
		data,
		url,
		method: "post"
	});
};
/* let latestChatItem = "000000000000000000000000";
	if (chatList.length !== 0)
		latestChatItem = chatList.sorted("_id", true)[0]._id;
 */
