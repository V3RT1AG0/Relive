//@flow
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    Image,
    TouchableNativeFeedback,
} from "react-native";
import Switch from "react-native-flip-toggle-button";
import Gradient from "react-native-linear-gradient";
import {UserRealm} from "./ProfileModel";
import {MY_ID} from "../../Config/Constants";
import {GalleryRealm} from "../GalleryActivity/GalleryModels";

export default class ProfileMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userInfo:UserRealm.objectForPrimaryKey(
            "User",MY_ID
        ) };
        Text.defaultProps.style = { fontFamily: "Roboto" };
    }
    handleChange = e => {
        if(this.state.userInfo.password)
            UserRealm.write(() => {
                this.state.userInfo.password = undefined
            });
        else
        {
            this.props.navigator.showModal({
                screen: "SetMasterPasswordModal", // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    modalPresentationStyle: "fullScreen",
                    navBarHidden: true,
                    topBarElevationShadowEnabled: false,
                    navBarNoBorder: true,
                    screenBackgroundColor: "rgba(52, 52, 52, 0.5)"
                }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                animationType: "screen" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });
        }

    };

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("forceUpdate");
        });
    };

    componentDidMount = () => {
       UserRealm.addListener("change", this.forceUpdateRealm);
    }

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTransparent: true,
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false
    };
    render() {
        return (
            <Gradient
                colors={["#263238", "#607d8b", "#263238"]}
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.5, 1.5]}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 70
                        }}
                    >
                        <View
                            style={{
                                height: 90,
                                width: 90,
                                borderRadius: 100,
                                overflow: "hidden",
                                elevation: 6,
                                backgroundColor: "#ccc"
                            }}
                        >
                            <Image
                                source={{uri:this.state.userInfo.dp}}
                                style={{
                                    flex: 1,
                                    width: null,
                                    alignSelf: "stretch"
                                }}
                            />
                        </View>
                        <Text style={{ marginTop: 10, color: "#fff", fontSize: 18 }}>
                            {this.state.userInfo.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            margin: 20,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#fff",
                            marginTop: 60
                        }}
                    >
                        <SectionList
                            sections={[
                                {
                                    title: "Master Password",
                                    switch: true,
                                    hasPassword: this.state.userInfo.password,
                                    data: [],
                                    subText: "Hide and Lock your Albums using a password."
                                },
                                {
                                    title: "Network",
                                    switch: true,
                                    network: true,
                                    data: [],
                                    subText: "Download & Upload over Data. "
                                },
                                {
                                    title: "Logout",
                                    data: [],
                                    logout: true
                                }
                            ]}
                            renderItem={({ item, section }) => (
                                <Text style={styles.item}>{item}</Text>
                            )}
                            renderSectionHeader={({ section }) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#fff",
                                        alignItems: "center",
                                        borderBottomColor: "#eceff1",
                                        borderBottomWidth: 1
                                    }}
                                >
                                    {section.switch ? (
                                        <TouchableNativeFeedback onPress={this.handleChange}>
                                            <Text style={styles.sectionHeader}>
                                                {section.title}
                                                <Text>{"\n"}</Text>
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        color: "#babdbe"
                                                    }}
                                                >
                                                    {section.subText}
                                                </Text>
                                            </Text>
                                        </TouchableNativeFeedback>
                                    ) : (
                                        <Text style={styles.sectionHeader}>{section.title}</Text>
                                    )}

                                    {section.switch && (
                                        <View style={{ marginRight: 10 }}>
                                            <Switch
                                                onToggle={this.handleChange}
                                                value={this.state.userInfo.password}
                                                buttonHeight={19}
                                                buttonWidth={35}
                                                sliderRadius={50}
                                                buttonRadius={50}
                                                buttonOnColor="#000"
                                                sliderOnColor="#efefef"
                                                sliderOffColor="#efefef"
                                                buttonOffColor="#ccc"
                                            />
                                        </View>
                                    )}
                                </View>
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <Text
                        style={{
                            color: "#ccc",
                            opacity: 0.7,
                            marginTop: 40,
                            alignSelf: "center",
                            fontStyle: "italic"
                        }}
                    >
                        "Your privacy is our topmost priority"
                    </Text>
                    <Text
                        style={{
                            color: "#ccc",
                            opacity: 0.6,
                            marginTop: 18,
                            alignSelf: "center"
                        }}
                    >
                        RELIVE{"  "}v1.0
                    </Text>
                </View>
            </Gradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 18,
        paddingBottom: 18,
        paddingHorizontal: 15,
        fontSize: 16,
        flex: 1,
        color: "#000"
    },
    item: {
        padding: 15,
        fontSize: 14
    }
});
