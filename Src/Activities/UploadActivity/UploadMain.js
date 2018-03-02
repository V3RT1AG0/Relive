//@flow
import React, { Component } from "react";
import Axios from "axios";
import { Button, View, TextInput } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { SERVER_URL } from "../../Config/Constants";
import CreateGroupTag from "../Components/CreateGroupTag/CreateGroupTag";

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: [],
			albumname: "",
			groupsTags: ["abc", "lmn"],
			users: ["xyz"]
		};
	}

	handleUploadButtonPress = () => {
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		const axios = Axios.create();
		axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});

		const payload = {
			album_name: this.state.albumname,
			created_by: "xyz", //current user
			groupTag_names_array: this.state.groupsTags,
			users_names_array: this.state.users,
			pending_images_array: this.image
		};

		console.log("albumID and subAlbumID0///" + this.state.image.length);

		axios({
			//create album
			data: payload,
			url: SERVER_URL + "createAlbum",
			method: "post"
		})
			.then(({ data }) => {
				const { albumId, subAlbumId } = data;
				console.log(
					"albumID and subAlbumID1" +
						albumId +
						subAlbumId +
						"length" +
						this.state.image.length
				);
				this.state.image.forEach(image => {
					//for each image perform the following actions
					console.log("albumID and subAlbumID2" + data.subAlbumId);
					const type = image.mime;
					const uri = image.path;
					const name = image.path; //TODO:get filename here if required
					let key;
					axios
						.post(SERVER_URL + "getPreSignedURL", {
							//get url from node.js along with key or filename
							type
						})
						.then(({ data }) => {
							console.log(data);
							key = data.Key;
							return axios({
								//upload image using signed url
								url: data.url,
								data: {
									uri,
									type,
									name
								},
								method: "put",
								headers: {
									"Content-Type": type,
									"x-amz-acl": "public-read"
									//"x-amz-server-side-encryption": "AES256"
								},
								transformRequest: [
									(data, headers) => {
										delete headers.common.Authorization;
										return data;
									}
								]
							});
						})
						.then(data => {
							// notify that the image was uploaded to our node.js server
							console.log(data);
							const payload = {
								url: key, //photo url
								subAlbumId,
								albumId
							};
							return axios({
								data: payload,
								url: SERVER_URL + "notifyImageUpload",
								method: "post"
							});
						})
						.then(success => console.log(success))
						.catch(error => console.log(error.response));
				});
				this.setState({ image: [] });
			})
			.catch(error => console.log(error.response));
	};

	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({
			multiple: true
		}).then(image => {
			console.log(image);
			this.setState({ image: [...this.state.image, ...image] });
		});
	};

	render() {
		return (
			<View>
				<TextInput
					onChangeText={albumname => this.setState({ albumname })}
					value={this.state.albumname}
				/>
				<Button onPress={this.handleUploadButtonPress} title="upload" />
				<Button
					onPress={this.handleOnPressImagePickerButton}
					title="ImagePicker"
				/>
				<CreateGroupTag />
			</View>
		);
	}
}

export default UploadActivity;
