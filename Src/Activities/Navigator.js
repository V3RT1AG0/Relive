// @flow
import React, { Component } from "react";
import { Button, View, AsyncStorage, NativeEventEmitter,Text } from "react-native";

export default class Navigator extends Component {
	constructor(props) {
		super(props);
		console.log(props,"props navigator")
		//AsyncStorage.clear();
	}

	setItem = async () => {
		console.log("setitem");
		try {
			await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
			console.log("reached");
		} catch (error) {
			console.log(error);
		}
	};

	getItem = async () => {
		try {
			const value = await AsyncStorage.getItem("@MySuperStore:key");
			if (value !== null) {
				// We have data!!
				console.log(value);
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		//const { this.props.navigator.push } = this.props.navigator;

		//this.setItem();
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
							screen: "Timeline",
							title: "Timeline"
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
							screen: "Upload"
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
				<Button
					title="ChatHome"
					onPress={() =>
						this.props.navigator.push({
							screen: "ChatHome"
						})
					}
				/>
				<Button
					title="Splash"
					onPress={() =>
						this.props.navigator.push({
							screen: "Splash",
							title: "Splash"
						})
					}
				/>
				<Button
					title="Lola"
					onPress={() => {
						//this.getItem();
					}}
				/>
                <Text>{this.props.url}</Text>
			</View>

		);
	}
}
