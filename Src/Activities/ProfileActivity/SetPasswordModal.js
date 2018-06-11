// @flow
import React, {Component} from "react";
import {Button, Text, TextInput, View} from "react-native";
import {connect} from "react-redux";
import {UserRealm} from "./ProfileModel";
import {MY_ID} from "../../Config/Constants";

export default class SetPasswordModal extends Component {
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


    handleDoneButtonPressed = () => {
        if (this.state.confirmation === this.state.password) {
            UserRealm.write(() => {
                this.state.userInfo.password = this.state.password
            });
            this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            });
        }
    }

    render() {
        return (
            <View style={{backgroundColor: "white", height:200,width:"100%",justifyContent:"center"}}>
                <TextInput multiline={false} secureTextEntry placeholder={"Enter Password"}
                           onChangeText={(password) => this.setState({password})}/>
                <TextInput multiline={false} secureTextEntry placeholder={"Confirm Password"}
                           onChangeText={(confirmation) => this.setState({confirmation})}/>
                <Button title={"Done"} onPress={this.handleDoneButtonPressed}/>
                <Button title={"Cancel"} onPress={()=>this.props.navigator.dismissModal()} />
            </View>
        );
    }
}


