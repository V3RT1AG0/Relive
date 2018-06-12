// @flow
import React, {Component} from "react";
import {Image, Text, TouchableNativeFeedback, View} from "react-native";
import {UserRealm} from "./ProfileModel";
import {MY_ID, SERVER_URL} from "../../Config/Constants";
import axios from "axios";

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: UserRealm.objectForPrimaryKey(
                "User", MY_ID
            )
        };
    }

    componentDidMount = () => {

    }

    static navigatorStyle = {
        navBarHidden: true,
    };

    handleDoneButtonPressed = () => {
        const payload = {
            id: MY_ID, username: this.state.name, dpUrl: this.state.dpUrl
        }
        // TODO first put the image in bucket before sending its url to server
        axios.post(SERVER_URL + "/updateProfile", payload).then((result) => {
            console.log("profileUpdated=>", result)
        });
    }

    // TODO put cross and cancel button in handleDoneButtonPressed
    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableNativeFeedback
                    onPress={this.handleDoneButtonPressed()}
                >
                    {/* tick*/}
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => this.props.navigator.dismissModal()}>
                    {/* cancel*/}
                </TouchableNativeFeedback>
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
                            source={{uri: this.state.userInfo.dp}}
                            style={{
                                flex: 1,
                                width: null,
                                alignSelf: "stretch"
                            }}
                        />
                    </View>
                    <Text style={{marginTop: 10, color: "#fff", fontSize: 18}}>
                        {this.state.userInfo.name}
                    </Text>
                </View>
            </View>
        )
    }

}


