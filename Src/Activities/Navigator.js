// @flow
import React, { Component } from "react";
import { Button, View } from "react-native";

export default class Navigator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { push } = this.props.navigator;

		return (
			<View>
				<Button
					title="Login"
					onPress={() =>
						push({
							screen: "Login",
							title: "Login"
						})
					}
				/>
				<Button
					title="Timeline"
					onPress={() =>
						push({
							screen: "Login",
							title: "Login"
						})
					}
				/>
				<Button
					title="Profile"
					onPress={() =>
						push({
							screen: "Profile",
							title: "Profie"
						})
					}
				/>
				<Button
					title="Upload"
					onPress={() =>
						push({
							screen: "Upload",
							title: "Upload"
						})
					}
				/>
				<Button
					title="Gallery"
					onPress={() =>
						push({
							screen: "Gallery",
							title: "Gallery"
						})
					}
				/>
				<Button
					title="Share"
					onPress={() =>
						push({
							screen: "Share",
							title: "Share"
						})
					}
				/>
			</View>
		);
	}
}
