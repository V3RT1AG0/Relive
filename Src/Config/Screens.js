// @flow
import React from "react";
import {
	Button,
	View,
	TextInput,
	Animated,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";
import UploadActivity from "../Activities/UploadActivity/UploadContainer";
import LoginActivity from "../Activities/LoginActivity/LoginMain";
import ProfileActivity from "../Activities/ProfileActivity/ProfileMain";
import TimelineActivity from "../Activities/TimelineActivity/TimelineContainer";
import GalleryActivity from "../Activities/GalleryActivity/GalleyContainer";
import ShareActivity from "../Activities/ShareActivity/ShareMain";
import NavigationActivity from "../Activities/Navigator";
import SplashActivity from "../Activities/SplashActivity/SplashMain";
import ChatHomeActivity from "../Activities/ChatHomeActivity/ChatHomeMain";
import UploadProgressActivity from "../Activities/UploadActivity/UploadProgress/UploadProgressMain";
import AlbumOptionsDialog from "../Activities/Components/Modules/AlbumOptions";
import ChatActivity from "../Activities/ChatMainActivity/ChatMain";
import store from "./ReduxStoreConfig";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/Feather";

//const store = configureStore();

const styles = StyleSheet.create({
	button: {
		overflow: "hidden",
		width: 34,
		height: 34,
		borderRadius: 34 / 2,
		justifyContent: "center",
		alignItems: "center"
	}
});

const Lock = () => (
	<Icon
		style={
			(styles.lockButton,
			{
				width: 30,
				height: 30,
				justifyContent: "center",
				overflow: "hidden",
				backgroundColor: "red",
				borderRadius: 30 / 2
			})
		}
		name="lock"
		size={30}
		color="#900"
	/>
);

const CustomButton = ({ text }) => (
	<TouchableOpacity
		style={[styles.button, { backgroundColor: "tomato" }]}
		onPress={() => console.log("pressed me!")}
	>
		<View style={styles.button}>
			<Text style={{ color: "white" }}>Hello</Text>
		</View>
	</TouchableOpacity>
);

store.subscribe(() => console.log("store changed" + store.getState()));

export function registerScreens() {
	Navigation.registerComponent("Navigator", () => NavigationActivity);
	Navigation.registerComponent("Splash", () => SplashActivity, store, Provider);
	Navigation.registerComponent("Upload", () => UploadActivity, store, Provider);
	Navigation.registerComponent(
		"UploadProgress",
		() => UploadProgressActivity,
		store,
		Provider
	);
	Navigation.registerComponent(
		"ChatHome",
		() => ChatHomeActivity,
		store,
		Provider
	);
	Navigation.registerComponent("Chat", () => ChatActivity, store, Provider);
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
	Navigation.registerComponent("AlbumOptionsDialog", () => AlbumOptionsDialog);
	Navigation.registerComponent("CustomButton", () => CustomButton);
	Navigation.registerComponent("Lock", () => Lock);
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
