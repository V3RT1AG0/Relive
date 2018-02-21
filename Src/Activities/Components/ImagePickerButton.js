// @flow
import React, { Component } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { Button } from "react-native";

class ImagePickerButton extends Component {
	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({
			multiple: true
		}).then(images => {
			console.log(images);
		});
	};

	render() {
		return (
			<Button
				onPress={this.handleOnPressImagePickerButton}
				title="ImagePicker"
			/>
		);
	}
}
export default ImagePickerButton;
