//@flow
import React, { Component } from "react";
import Axios from "axios";
import { Button, View, TextInput, Animated, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { SERVER_URL, MY_ID } from "../../Config/Constants";
import CreateGroupTag from "../Components/CreateGroupTag/CreateGroupTag";
import Gallery from "../Components/Gallery/Gallery";
import AlbumDetailsForm from "../Components/Modules/AlbumDetailsForm";
import AlbumOptions from "../Components/Modules/AlbumOptions";
import { NavigationBar } from "@shoutem/ui";
import styles from "./Style";
import Interactable from "react-native-interactable";
import Upload from "react-native-background-upload";
import { UploadRealm } from "./UploadModel";
import { startInsertingImages } from "../../Config/UploadService";
import { createNewAlbumOrSubAlbum, loadAlbumToRealm } from "./UploadUtils";
import { Navigation } from "react-native-navigation";
import GestureRecognizer from "react-native-swipe-gestures";

class UploadActivity extends Component {
	topReached = false;

	constructor(props) {
		super(props);
		this.selectedImages = [];
		this.axios = Axios.create();
		this.axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});
		this.scrollY = new Animated.Value(0);
		this.state = {
			showOptions: false,
			albumname: "",
			groupsTags: ["5a9280f2e800da77ac1ebb94"],
			users: [MY_ID, "5a9a384f7457c40449e74e6c", "5a9a38647457c40449e74e6d"],
			albumId: "5a9ba2588db14e194f7b78d1"
		};
	}

	static navigatorStyle = {
		drawUnderNavBar: true,
		navBarTransparent: true,
		navBarNoBorder: true,
		topBarElevationShadowEnabled: false
	};

	/* static navigatorButtons = {
		rightButtons: [
			 {
				component: "Lock",
				id: "add",
				passProps: {
					
				}
			}, 
			{
				component: "CustomButton",
				id: "dadd",
				passProps: {
					text: "Hi!"
				}
			}
		]
	}; */

	handleUploadButtonPress = () => {
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		const payload = {
			album_name: this.state.albumname,
			created_by: "xyz", //current user
			groupTag_id_array: this.state.groupsTags,
			users_id_array: this.state.users
		};

		//startInsertingImages(this.selectedImages, "asdasd");
		createNewAlbumOrSubAlbum(payload, "/album/createAlbum").then(({ data }) => {
			const { AlbumId } = data;
			loadAlbumToRealm(AlbumId, this.state.albumname, this.selectedImages);
			startInsertingImages(this.selectedImages, AlbumId);
			this.props.navigator.push({
				screen: "UploadProgress",
				passProps: { AlbumId }
			});
		});
	};

	handleOnPressImagePickerButton = () => {
		ImagePicker.openPicker({
			multiple: true
		}).then(image => {
			console.log(image);
			//this.setState({ image: [...this.state.image, ...image] });
			this.selectedImages = [...this.selectedImages, ...image];
		});
	};

	addSelectedImage = selectedImage => {
		console.log(selectedImage, this.selectedImages.length);
		this.selectedImages.push(selectedImage);
		//this.setState({}); // This is done to forceupdate the slectedimages count prop passed to gallery.
		// either try rerendering this whole activity for just a simple count or re
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
	onSwipeDown = gestureState => {
		console.log("You swiped up!");
		if (this.topReached) this.refs.gallery.snapTo({ index: 0 });
	};

	render() {
		const scrollY = this.scrollY.interpolate({
			inputRange: [-350, 0],
			outputRange: [150, 150]
		});

		const opacity = this.scrollY.interpolate({
			inputRange: [-250, 0],
			outputRange: [0.5, 1]
		});

		/* const config = {
			velocityThreshold: 0.1,
			directionalOffsetThreshold: 1
		}; */
		console.log("super", this.selectedImages.length);

		return (
			<View style={styles.topContainer}>
				{/* <NavigationBar hasHistory /> */}
				{/* <Animated.View style={{opacity}}>{uploadCompArr}</Animated.View> */}
				{this.state.showOptions ? <AlbumOptions /> : undefined}
				<Animated.View
					style={(styles.infoContainer, { top: scrollY, opacity })}
				>
					<AlbumDetailsForm
						navigator={this.props.navigator}
						onOptionButtonPressed={this.handleOptionButtonPressed}
					/>
					<Button onPress={this.handleUploadButtonPress} title="upload" /> 
				</Animated.View>
				{/* <GestureRecognizer onSwipeDown={this.onSwipeDown} config={config}> */}
				<Interactable.View
					ref="gallery"
					style={styles.bottomGalleyContainer}
					verticalOnly
					snapPoints={[{ y: 0 }, { y: -350 }]}
					animatedValueY={this.scrollY}
				>
					<Gallery
						onImageAdded={this.addSelectedImage}
						onImageRemoved={this.removeSelectedImage}
						beginDrag={this.beginDrag}
						endDrag={this.endDrag}
						onScrollUp={this.handleOnScrollUp}
						galleryMargin={5}
						galleryPadding={5}
						numColumns={3}
						noOfSelectedImages={this.selectedImages.length}
						//onMomentumScrollBegin={this.beginDrag}
						//onMomentumScrollEnd={this.endDrag}
					/>
				</Interactable.View>
				{/* </GestureRecognizer> */}
			</View>
		);
	}
	beginDrag = () => {
		this.isDragging = true;
		if (this.reachedZero) this.refs.gallery.snapTo({ index: 0 });
	};
	endDrag = () => {
		this.isDragging = false;
		//console.log("end", this.beginDrag);
	};
	handleOnScrollUp = event => {
		/* this.reachedZero = false;
		console.log(event.nativeEvent);
		console.log(event.nativeEvent.contentOffset.y, this.isDragging);
		if (!this.isDragging) {
			if (event.nativeEvent.contentOffset.y < 0)
				this.refs.gallery.snapTo({ index: 0 });
			else */

		if (!this.isDragging)
			if (event.nativeEvent.contentOffset.y > 0)
				this.refs.gallery.snapTo({ index: 1 });
		/*}
		 if (event.nativeEvent.contentOffset.y === 0) this.reachedZero = true; */
	};

	/* handleOnScrollDown = () => {
		this.refs.gallery.snapTo({ index: 0 });
	}; */
}

export default UploadActivity;
