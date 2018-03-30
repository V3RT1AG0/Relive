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
		this.props.startUploadingPhotos(
			payload,
			this.selectedImages,
			this.props.navigator
		);
		/* this.props.navigator.push({
			screen: "UploadProgress"
		}); */

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
