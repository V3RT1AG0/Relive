// @flow
import { Navigation } from "react-native-navigation";
import UploadActivity from "../Activities/UploadActivity/UploadContainer";
import LoginActivity from "../Activities/LoginActivity/LoginMain";
import ProfileActivity from "../Activities/ProfileActivity/ProfileMain";
import TimelineActivity from "../Activities/TimelineActivity/TimelineContainer";
import GalleryActivity from "../Activities/GalleryActivity/GalleyContainer";
import ShareActivity from "../Activities/ShareActivity/ShareMain";
import NavigationActivity from "../Activities/Navigator";
import UploadProgressActivity from "../Activities/UploadActivity/UploadProgress/UploadProgressMain";
import store from "./ReduxStoreConfig";
import { Provider } from "react-redux";
//const store = configureStore();
store.subscribe(() => {
	console.log("store changed" + store.getState());
});

export function registerScreens() {
	Navigation.registerComponent("Navigator", () => NavigationActivity);
	Navigation.registerComponent("Upload", () => UploadActivity, store, Provider);
	Navigation.registerComponent(
		"UploadProgress",
		() => UploadProgressActivity,
		store,
		Provider
	);
	Navigation.registerComponent("Login", () => LoginActivity, store, Provider);
	Navigation.registerComponent("Profile", () => ProfileActivity);
	Navigation.registerComponent(
		"Timeline",
		() => TimelineActivity,
		store,
		Provider
	);
	Navigation.registerComponent(
		"Gallery",
		() => GalleryActivity,
		store,
		Provider
	);
	Navigation.registerComponent("Share", () => ShareActivity, store, Provider);
}

/* const RootNavigator = StackNavigator({
	Navigator: {
		screen: NavigationActivity,
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
