// @flow
import React, { Component } from "react";
//import { Examples } from '@shoutem/ui';
import { View } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import axios from "axios";
import { SERVER_URL } from "../../Config/Constants";

export default class LoginActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			phone: ""
		};
	}

	handleNameChange = name => this.setState({ name });
	handleContactChange = phone => this.setState({ phone });
	handeleSubmitButton = () => {
		const { name, phone } = this.state;
		axios
			.post(SERVER_URL + "/user/signUp", { name, phone })
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<View>
				<TextInput placeholder="Name" onChangeText={this.handleNameChange} />
				<TextInput
					placeholder="ContactNumber"
					onChangeText={this.handleContactChange}
				/>
				<Button title="Submit" onPress={this.handeleSubmitButton} />
			</View>
		);
	}
}
