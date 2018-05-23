// @flow
import {SERVER_URL} from "../../Config/Constants";
import axios from "axios";
import {ChatRealm} from "./ChatModel";

export const sendMessageToServer = (chatid, message) => {
    const url = SERVER_URL + "/chat/add";
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

// the nbelow code works when messages os loaded for first time but when same messages is loaded next time it will give error
export const fetchNewChatsFromNetwork = (chatID, userID, messages) => {
    /* let latestChatItem = "000000000000000000000000";*/
    console.log(messages,"messages=>")
    if (messages.length !== 0) {
        // provide offset to load next messages from that particular message
        const latestChatItem = messages.sorted("_id", true)[0]._id;
        return axios
            .post(SERVER_URL + "/chat/data", {
                chatid: chatID,
                userid: userID,
                offset: latestChatItem
            })
            .then(result => {
                console.log("fetchfromnetwork", result);
                return putNewConversationsToRealm(result.data.next.messages, chatID);
            })
            .catch(error => console.log(error));
    }
    else {
        //else retrive all the messages from the beginning
        return axios
            .post(SERVER_URL + "/chat/data", {
                chatid: chatID,
                userid: userID
            })
            .then(result => {
                console.log("fetchfromnetwork", result);
                return putNewConversationsToRealm(result.data.messages, chatID);
            })
            .catch(error => console.log(error));
    }
}

export const putNewConversationsToRealm = (Messages, chatId) =>
    new Promise((resolve, reject) => {
        try {
            console.log(Messages);
            const ChatList = ChatRealm.objectForPrimaryKey("ChatList", chatId);
            ChatRealm.write(() => {
                Messages.forEach(item => {
                    console.log(item);
                    ChatList.messages.push(item);
                });
            });
            resolve("success");
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
