// @flow
import React, { Component } from "react";
import Axiosa from "axios";
import { Button, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.state = { image: {} };
	}

	handleUploadButtonPress = () => {
		const axios = Axiosa.create();
		axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});

		axios({
			url:
				"https://trialspace.sgp1.digitaloceanspaces.com/0.6064987529141741.jpg?AWSAccessKeyId=6YFIAIPMZPFI6D4KCMLZ&Content-Type=image%2Fjpeg&Expires=1517933548&Signature=Iq5M1FvXKTUUGEOZ2Nwy94yXK70%3D&x-amz-acl=public-read",
			data: {
				uri: this.state.image.path,
				type: "image/jpeg",
				name: "0.3789520076534978.jpg"
			},
			method: "put",
			headers: {
				"Content-Type": "image/jpeg",
				"x-amz-acl": "public-read"
			},
			transformRequest: [
				(data, headers) => {
					delete headers.common.Authorization;
					return data;
				}
			]
		})
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			});
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
