// @flow
import React, { Component } from "react";
import { Button, View } from "react-native";

export default class Navigator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//const { this.props.navigator.push } = this.props.navigator;

		return (
			<View>
				<Button
					title="Login"
					onPress={() =>
						this.props.navigator.push({
							screen: "Login",
							title: "Login"
						})
					}
				/>
				<Button
					title="Timeline"
					onPress={() =>
						this.props.navigator.push({
							screen: "Login",
							title: "Login"
						})
					}
				/>
				<Button
					title="Profile"
					onPress={() =>
						this.props.navigator.push({
							screen: "Profile",
							title: "Profie"
						})
					}
				/>
				<Button
					title="Upload"
					onPress={() =>
						this.props.navigator.push({
							screen: "Upload",
							title: "Upload"
						})
					}
				/>
				<Button
					title="Gallery"
					onPress={() =>
						this.props.navigator.push({
							screen: "Gallery",
							title: "Gallery"
						})
					}
				/>
				<Button
					title="Share"
					onPress={() =>
						this.props.navigator.push({
							screen: "Share",
							title: "Share"
						})
					}
				/>
				<Button
					title="UploadProgress"
					onPress={() =>
						this.props.navigator.push({
							screen: "UploadProgress",
							title: "UploadProgress"
						})
					}
				/>
			</View>
		);
	}
}
