// @flow
import React, { Component } from "react";
import { Button, View } from "react-native";

export default class Navigator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Button title="Login" onPress={() => navigate("Login")} />
				<Button title="Timeline" onPress={() => navigate("Timeline")} />
				<Button title="Profile" onPress={() => navigate("Profile")} />
				<Button title="Upload" onPress={() => navigate("Upload")} />
				<Button title="Gallery" onPress={() => navigate("Gallery")} />
			</View>
		);
	}
}
