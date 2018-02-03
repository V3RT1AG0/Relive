// @flow
import React, { Component } from "react";
import { Text, Button, View, Image } from "react-native";
import axios from "axios";
import ImagePickerButton from "./Elements/ImagePickerButton";
const image = require("../Assets/Images/2.jpg");
const AWS = require("aws-sdk/dist/aws-sdk-react-native");

/* const file = {
	// `uri` can also be a file system path (i.e. file://)
	uri: "file:../Assets/Images/2.jpg",
	name: "image.jpg",
	type: "image/jpeg"
};

const options = {
	keyPrefix: "uploads/",
	bucket: "trialspace",
	region: "sgp1",
	accessKey: "YFIAIPMZPFI6D4KCMLZ",
	secretKey: "MjViUX5ow+ZZPizjvTG6cO5BlJs7M7Bdzc1dXGXkSvE",
	successActionStatus: 201
}; */

class MainActivity extends Component {
	/* const data = new FormData();
		data.append("photo", {
			uri: "file:../Assets/Images/2.jpg",
			type: "image/jpeg", // or photo.type
			name: "testPhotoName"
		});
		fetch("http://localhost:3001/upload", {
			method: "post",
			body: data
		}).then(res => {
			console.log(res);
        }); */
	//axios.get("http://localhost:3001").then(data => console.log(data));
	/* RNS3.put(file, options).then(response => {
			if (response.status !== 201)
				throw new Error("Failed to upload image to S3");
			console.log(response.body);
		});

		axios
			.get("http://192.168.31.59:3004")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});

		const formData = new FormData();
		formData.append("file", " image");

		axios({
			url: "http://192.168.31.59:3006/upload",
			method: "POST",
			data: formData,
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data"
			}
		})
			.then(response => {
				//handle success
				console.log("executed" + response);
			})
			.catch(response => {
				//handle error
				console.log("errpr" + response);
			});

		/* axios
			.post({
				url: "http://192.168.31.59:3004/upload",
				data,
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			//.post("http://192.168.31.59:3003/upload", data)
			.then(); 
	}; */

	render() {
		return (
			<View>
				<Image source={image} />
				<Button title="Click" onPress={this.handleButtonPress} />
				<Text>Hello world!</Text>
				<ImagePickerButton />
			</View>
		);
	}
}

export default MainActivity;
