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
import {Navigation} from "react-native-navigation";
import UploadActivity from "../Activities/UploadActivity/UploadContainer";
import LoginActivity from "../Activities/LoginActivity/LoginMain";
import ProfileActivity from "../Activities/ProfileActivity/ProfileMain";
import TimelineActivity from "../Activities/TimelineActivity/TimelineContainer";
import TimelineGalleryView from "../Activities/TimelineActivity/TimeLineGalleryView";
import GalleryActivity from "../Activities/GalleryActivity/GalleyContainer";
import GalleryOptionsModal from "../Activities/GalleryActivity/GalleryOptionsModal";
import ShareActivity from "../Activities/ShareActivity/ShareMain";
import NavigationActivity from "../Activities/Navigator";
import SplashActivity from "../Activities/SplashActivity/SplashMain";
import ChatHomeActivity from "../Activities/ChatHomeActivity/ChatHomeMain";
import UploadProgressActivity from "../Activities/UploadActivity/UploadProgress/UploadProgressMain";
import AlbumOptionsDialog from "../Activities/Components/Modules/AlbumOptions";
import ChatActivity from "../Activities/ChatMainActivity/ChatMain";
import store from "./ReduxStoreConfig";
import {Provider} from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Ionicons";
import SwiperActivity from "../Activities/SwiperActivity";
import NotificationActivity from "../Activities/NotificationActivity/NotificationMain";
import MasterPassModal from "../Activities/ProfileActivity/SetPasswordModal";
import EditProfile from "../Activities/ProfileActivity/EditProfile";

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
//
const DropDownArrow = () => (
    <TouchableOpacity style={{
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,
    }}
                      onPress={() => {
                          Navigation.showModal({
                              screen: "GalleryOptionsModal", // unique ID registered with Navigation.registerScreen
                              navigatorStyle: {
                                  modalPresentationStyle: "fullScreen",
                                  navBarHidden: false,
                                  topBarElevationShadowEnabled: false,
                                  navBarNoBorder: true,
                                  screenBackgroundColor: "white"
                              }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                              animationType: "screen" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
                          });
                      }}>
        <Icon2
            style={{
                marginTop: 10,
                width: 25,
                height: 25,
                overflow: "hidden",
                color: "black",
                borderRadius: 25 / 2
            }}
            name="ios-arrow-down"
            size={25}
        />
    </TouchableOpacity>
);

const CustomButton = ({text}) => (
    <TouchableOpacity
        style={[styles.button, {backgroundColor: "tomato"}]}
        onPress={() => console.log("pressed me!")}
    >
        <View style={styles.button}>
            <Text style={{color: "white"}}>Hello</Text>
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
    Navigation.registerComponent(
        "TimelineGallery",
        () => TimelineGalleryView,
        store,
        Provider
    );
    Navigation.registerComponent("SwiperActivity", () => SwiperActivity, store, Provider);
    Navigation.registerComponent("Share", () => ShareActivity, store, Provider);
    Navigation.registerComponent("NotificationActivity", () => NotificationActivity, store, Provider);
    Navigation.registerComponent("AlbumOptionsDialog", () => AlbumOptionsDialog);
    Navigation.registerComponent("GalleryOptionsModal", () => GalleryOptionsModal);
    Navigation.registerComponent("CustomButton", () => CustomButton);
    Navigation.registerComponent("Lock", () => Lock);
    Navigation.registerComponent("DropDownArrow", () => DropDownArrow);
    Navigation.registerComponent("SetMasterPasswordModal", () => MasterPassModal);
    Navigation.registerComponent("EditProfile", () => EditProfile);
}
