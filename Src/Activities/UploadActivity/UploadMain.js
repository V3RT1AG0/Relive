//@flow
import React, { Component } from "react";
import Axios from "axios";
import { Button, View, TextInput, Animated, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { SERVER_URL, MY_ID } from "../../Config/Constants";
import CreateGroupTag from "../Components/CreateGroupTag/CreateGroupTag";
import Gallery from "../Components/Gallery/Gallery";
import AlbumDetailsForm from "../Components/Modules/AlbumDetailsForm";
import { NavigationBar } from "@shoutem/ui";
import styles from "./Style";
import Interactable from "react-native-interactable";
import Upload from "react-native-background-upload";

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		console.log(props, "props");
		this.selectedImages = [];
		this.axios = Axios.create();
		this.axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});
		this.scrollY = new Animated.Value(0);
		this.state = {
			//image: [],
			albumname: "",
			groupsTags: ["5a9280f2e800da77ac1ebb94"],
			users: [MY_ID, "5a9a384f7457c40449e74e6c", "5a9a38647457c40449e74e6d"],
			albumId: "5a9ba2588db14e194f7b78d1"
			//5aa2152bad55272f3e1f758e
		};
	}

	handleUploadButtonPress = () => {
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		const payload = {
			album_name: this.state.albumname,
			created_by: "xyz", //current user
			groupTag_id_array: this.state.groupsTags,
			users_id_array: this.state.users
			//pending_images_array: this.image
		};
		this.props.startUploadingPhotos(payload, this.selectedImages);
		//this.createNewAlbumOrSubAlbum(payload, "/album/createAlbum");
	};

	componentDidMount = () => {};

	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({
			multiple: true
		}).then(image => {
			console.log(image);
			this.setState({ image: [...this.state.image, ...image] });
		});
	};

	addSelectedImage = selectedImage => {
		console.log(selectedImage);
		this.selectedImages.push(selectedImage);
	};

	removeSelectedImage = selectedImage => {
		const index = this.selectedImages.indexOf(selectedImage);
		if (index > -1) this.selectedImages.splice(index, 1);
	};

	/* createNewAlbumOrSubAlbum = (payload, path) => {
		console.log("albumID and subAlbumID///" + this.state.image.length);

		this.axios({
			//create album
			data: payload,
			url: SERVER_URL + path,
			method: "post"
		})
			.then(({ data }) => {
				const { AlbumId } = data;
				console.log(" AlbumID1" + AlbumId + "length" + this.state.image.length);
				this.startInsertingImages(this.selectedImages, AlbumId);
				this.setState({ image: [] });
			})
			.catch(error => console.log(error.response));
	};

	startInsertingImages = (Images, AlbumId) => {
		Images.forEach(image => {
			//for each image perform the following actions
			console.log("albumID" + AlbumId);
			const type = image.mime;
			const uri = image.src;
			/* Platform.OS === "android"
					? image.path.replace("file://", "")
					: image.path; */
			const name = image.path; //TODO:get filename here if required
			let key;
			this.axios
				.post(SERVER_URL + "/photos/getPreSignedURL", {
					//get url from node.js along with key or filename
					type
				})
				.then(({ data }) => {
					key = data.Key;
					const options = {
						url: data.url,
						path: uri,
						method: "PUT",
						type: "raw",
						field: "uploaded_media",
						headers: {
							"Content-Type": type,
							"x-amz-acl": "public-read"
						},
						notification: {
							enabled: true
						}
					};

					Upload.startUpload(options)
						.then(uploadId => {
							console.log("Upload started");
							Upload.addListener("progress", uploadId, data => {
								console.log(`Progress: ${data.progress}%`);
							});
							Upload.addListener("error", uploadId, data => {
								console.log(`Error: ${data.error}%`);
							});
							Upload.addListener("cancelled", uploadId, data => {
								console.log(`Cancelled!`);
							});
							Upload.addListener("completed", uploadId, data => {
								// data includes responseCode: number and responseBody: Object
								console.log(data);
								console.log("Completed!");
								const payload = {
									url: key, //photo url
									AlbumId
								};
								return this.axios({
									data: payload,
									url: SERVER_URL + "/photos/notifyImageUpload",
									method: "post"
								});
							});
						})
						.catch(err => {
							console.log("Upload error!", err);
						});

					/* console.log(data);
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
					}); */
				});
			/* .then(data => {
					// notify that the image was uploaded to our node.js server
					console.log(data);
					const payload = {
						url: key, //photo url
						AlbumId
					};
					return this.axios({
						data: payload,
						url: SERVER_URL + "/photos/notifyImageUpload",
						method: "post"
					});
				})
				.then(success => console.log(success))
				.catch(error => console.log(error.response)); */
		});
	}; */

	/* render() {
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
	} */

	render() {
		const scrollY = this.scrollY.interpolate({
			inputRange: [-250, 0],
			outputRange: [5, 200]
		});

		const opacity = this.scrollY.interpolate({
			inputRange: [-250, 0],
			outputRange: [0.5, 1]
		});

		return (
			<View style={styles.topContainer}>
				{/* <NavigationBar hasHistory /> */}
				{/* <Animated.View style={{opacity}}>{uploadCompArr}</Animated.View> */}

				<Animated.View
					style={(styles.infoContainer, { top: scrollY, opacity })}
				>
					<AlbumDetailsForm />
					<Button onPress={this.handleUploadButtonPress} title="upload" />
				</Animated.View>

				<Interactable.View
					ref="gallery"
					style={styles.bottomGalleyContainer}
					verticalOnly
					snapPoints={[{ y: 0 }, { y: -250 }]}
					animatedValueY={this.scrollY}
				>
					<Gallery
						onImageAdded={this.addSelectedImage}
						onImageRemoved={this.removeSelectedImage}
						onScrollUp={this.handleOnScrollUp}
						galleryMargin={5}
						galleryPadding={5}
						numColumns={3}
					/>
				</Interactable.View>
			</View>
		);
	}

	handleOnScrollUp = () => {
		this.refs.gallery.snapTo({ index: 1 });
	};
}

export default UploadActivity;
