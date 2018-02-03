// @flow
import React, { Component } from "react";
import axios from "axios";
import { Button, View } from "react-native";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import ImagePicker from "react-native-image-crop-picker";

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.state = { image: {} };
	}

	handleUploadButtonPress = () => {
		/* const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
		const s3 = new AWS.S3({
			endpoint: spacesEndpoint,
			accessKeyId: "6YFIAIPMZPFI6D4KCMLZ",
			secretAccessKey: "MjViUX5ow+ZZPizjvTG6cO5BlJs7M7Bdzc1dXGXkSvE"
		});

		const params = {
			Body: this.state.image.path,
			Bucket: "trialspace",
			Key: "try2.jpg"
		};

		s3.putObject(params, (err, data) => {
			if (err) console.log(err, err.stack);
			else console.log(data);
        }); */

		/****************************************** */
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		axios
			.post("http://192.168.31.59:3000/getPreSignedURL", {
				type: this.state.image.mime
			})
			.then(({ data }) => {
				console.log(data);
				const xhr = new XMLHttpRequest();
				console.log(data.key);
				xhr.open("PUT", data.url);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							console.log("Image successfully uploaded to S3");
						} else {
							console.log("Error while sending the image to S3");
						}
					}
				};

				xhr.setRequestHeader("Content-Type", data.contentType);
				xhr.send({
					uri: this.state.image.path,
					type: data.contentType,
					name: data.key
				});
				return data;
			})
			/*	.then(({ key }) => {
				console.log(key);
				axios.post("notifyImageUploaded", { key });
			}) */
			.catch(error => {
				console.log(error);
			});

		/****************************************** */

		/* const options = {
			headers: {
				"Content-Type": "image/jpeg"
			}
		};

		const data = {
			uri: this.state.image.path,
			type: this.state.image.mime,
			name: "myimage.jpg"
		};

		axios
			.put(url, data, options)
			.then(success => console.log(success))
			.catch(error => console.log(error.response)); */
	};

	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({}).then(image => {
			console.log(image);
			this.setState({ image });
		});
	};

	render() {
		return (
			<View>
				<Button onPress={this.handleUploadButtonPress} title="upload" />
				<Button
					onPress={this.handleOnPressImagePickerButton}
					title="ImagePicker"
				/>
			</View>
		);
	}
}

export default UploadActivity;
