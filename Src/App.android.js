// @flow
/* import { StackNavigator } from "react-navigation";
import configureStore from "./Config/ReduxStoreConfig";
import { Provider } from "react-redux"; */
//import React from "react";
/* import UploadActivity from "./Activities/UploadActivity/UploadMain";
import LoginActivity from "./Activities/LoginActivity/LoginMain";
import ProfileActivity from "./Activities/ProfileActivity/ProfileMain";
import TimelineActivity from "./Activities/TimelineActivity/TimelineContainer";
import GalleryActivity from "./Activities/GalleryActivity/GalleyContainer";
import ShareActivity from "./Activities/ShareActivity/ShareMain"; */
//import Navigation from "./Activities/Navigator";
import axios from "axios";
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./Config/Screens";
import { AppState } from "react-native";
import { setUpNewUploadRealmListener } from "./Config/Listeners";

axios.interceptors.request.use(request => {
	console.log("Starting Request", request);
	return request;
});

registerScreens();

Navigation.startSingleScreenApp({
	screen: {
		label: "One",
		screen: "Navigator",
		title: "Screen One",
		icon: require("./Assets/Images/checked.png")
	}
});

setUpNewUploadRealmListener();
/* AppState.addEventListener("change", () => {
	console.log("abc");
}); */

/* const RootNavigator = StackNavigator({
	Navigator: {
		screen: Navigation,
		navigationOptions: {
			headerTitle: "Navigator"
		}
	},
	Upload: {
		screen: UploadActivity,
		navigationOptions: {
			headerTitle: "UploadActivity"
		}
	},
	Login: {
		screen: LoginActivity,
		navigationOptions: {
			headerTitle: "LoginActivity"
		}
	},
	Profile: {
		screen: ProfileActivity,
		navigationOptions: {
			headerTitle: "ProfileActivity"
		}
	},
	Timeline: {
		screen: TimelineActivity,
		navigationOptions: {
			headerTitle: "TimelineActivity"
		}
	},
	Gallery: {
		screen: GalleryActivity,
		navigationOptions: {
			headerTitle: "Gallery"
		}
	},
	Share: {
		screen: ShareActivity,
		navigationOptions: {
			headerTitle: "Share"
		}
	}
});
 */
/* const store = configureStore();
console.log("store changed" + store.getState());
store.subscribe(() => {
	console.log("store changed" + store.getState());
}); */

//you need to import React even for stateless functional components
/* const app =import { setUpNewUploadRealmListener } from './Config/Listeners';
 () => (
	<Provider store={store}>
		<RootNavigator />
	</Provider>
);

export default app; */
