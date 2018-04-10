// @flow
import OneSignal from "react-native-onesignal"; // Import package from node modules
import { AsyncStorage, NativeEventEmitter, NativeModules } from "react-native";
import { ChatRealm } from "../Activities/ChatMainActivity/ChatModel";

const setItem = async payload => {
	try {
		await AsyncStorage.setItem("@MySuperStore:key", payload);
		console.log("reached");
	} catch (error) {
		console.log(error);
	}
};

const getItem = async () => {
	try {
		const value = await AsyncStorage.getItem("@MySuperStore:key");

		// We have data!!
		console.log(value);
	} catch (error) {
		console.log(error);
	}
};
/* 
const onReceived = notification => {
	console.log("Notification received: ", notification);
	setItem();
};

const onOpened = openResult => {
	console.log("Message: ", openResult.notification.payload.body);
	console.log("Data: ", openResult.notification.payload.additionalData);
	console.log("isActive: ", openResult.notification.isAppInFocus);
	console.log("openResult: ", openResult);
	getItem();
};

const onIds = device => {
	console.log("Device info: ", device);
	getItem();
};

OneSignal.addEventListener("received", onReceived);
OneSignal.addEventListener("opened", onOpened);
OneSignal.addEventListener("ids", onIds);
 */

getItem();
const new_notification = new NativeEventEmitter(NativeModules.Notification);
new_notification.addListener("notification", payload => {
	console.log(payload);
	const { roomId, message } = payload;
	try {
		const messages = ChatRealm.objectForPrimaryKey("ChatList", roomId).messages;
		ChatRealm.write(() => {
			messages.push(message);
		});
	} catch (e) {
		console.log("Error on creation", e);
	}
	setItem(JSON.stringify(payload));
});
console.log("Notification listeners set up");
