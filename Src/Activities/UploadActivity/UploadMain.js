//@flow
import React, { Component } from "react";
import Axios from "axios";
import { Button, View, TextInput } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { SERVER_URL, MY_ID } from "../../Config/Constants";
import CreateGroupTag from "../Components/CreateGroupTag/CreateGroupTag";

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.axios = Axios.create();
		this.axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});

		this.state = {
			image: [],
			albumname: "",
			groupsTags: ["5a9280f2e800da77ac1ebb94"],
			users: [MY_ID, "5a9a384f7457c40449e74e6c", "5a9a38647457c40449e74e6d"],
			albumId: "5a9ba2588db14e194f7b78d1"
		};
	}

	handleUploadButtonPress = () => {
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		const payload = {
			album_name: this.state.albumname,
			created_by: "xyz", //current user
			groupTag_id_array: this.state.groupsTags,
			users_id_array: this.state.users,
			pending_images_array: this.image
		};
		this.createNewAlbumOrSubAlbum(payload, "album/createAlbum");
	};

	handleCreateSubAlbumButton = () => {
		const payload = {
			albumId: this.state.albumId,
			created_by: "xyz", //current user
			groupTag_id_array: this.state.groupsTags,
			users_id_array: this.state.users,
			pending_images_array: this.image
		};
		this.createNewAlbumOrSubAlbum(payload, "album/createSubAlbum");
	};

	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({
			multiple: true
		}).then(image => {
			console.log(image);
			this.setState({ image: [...this.state.image, ...image] });
		});
	};

	createNewAlbumOrSubAlbum = (payload, path) => {
		console.log("albumID and subAlbumID///" + this.state.image.length);

		this.axios({
			//create album
			data: payload,
			url: SERVER_URL + path,
			method: "post"
		})
			.then(({ data }) => {
				const { subAlbumId } = data;
				console.log(
					" subAlbumID1" + subAlbumId + "length" + this.state.image.length
				);
				this.startInsertingImages(this.state.image, subAlbumId);
				this.setState({ image: [] });
			})
			.catch(error => console.log(error.response));
	};

	startInsertingImages = (Images, subAlbumId) => {
		Images.forEach(image => {
			//for each image perform the following actions
			console.log("albumID and subAlbumID2" + subAlbumId);
			const type = image.mime;
			const uri = image.path;
			const name = image.path; //TODO:get filename here if required
			let key;
			this.axios
				.post(SERVER_URL + "photos/getPreSignedURL", {
					//get url from node.js along with key or filename
					type
				})
				.then(({ data }) => {
					console.log(data);
					key = data.Key;
					return this.axios({
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
						subAlbumId
					};
					return this.axios({
						data: payload,
						url: SERVER_URL + "photos/notifyImageUpload",
						method: "post"
					});
				})
				.then(success => console.log(success))
				.catch(error => console.log(error.response));
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
					onPress={this.handleCreateSubAlbumButton}
					title="add to subalbum"
				/>
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
