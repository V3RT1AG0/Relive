//@flow
import React, { Component } from "react";
import { Button, View, TextInput, Animated, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Gallery from "../../Components/Gallery/Gallery";
import styles from "./Style";
import Interactable from "react-native-interactable";
import { connect } from "react-redux";
import { MY_ID } from "../../../Config/Constants";
import { UploadRealm } from "../UploadModel";
import { addPhotosToRealm } from "../UploadUtils";
import { startInsertingImages } from "../../../Config/UploadService";

class UploadProgressMain extends Component {
	constructor(props) {
		super(props);
		console.log(props, "props");
		this.selectedImages = [];
		this.scrollY = new Animated.Value(0);
		this.state = {
			queuedImages: UploadRealm.objectForPrimaryKey("Album", props.AlbumId)
				.photos,
			albumname: "",
			groupsTags: ["5a9280f2e800da77ac1ebb94"],
			users: [MY_ID, "5a9a384f7457c40449e74e6c", "5a9a38647457c40449e74e6d"],
			albumId: "5a9ba2588db14e194f7b78d1"
		};
	}

	forceUpdateRealm = () => {
		this.forceUpdate(() => {
			console.log("StateChanged=>", this.state.queuedImages);
		});
	};

	componentDidMount = () => {
		UploadRealm.addListener("change", this.forceUpdateRealm);
	};

	componentWillUnmount = () => {
		UploadRealm.removeListener("change", this.forceUpdateRealm);
	};

	handleUploadButtonPress = () => {
		addPhotosToRealm(this.props.AlbumId, this.selectedImages)
			.then(() => {
				startInsertingImages(this.selectedImages, this.props.AlbumId);
			})
			.catch(e => console.log(e));
	};

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

	render() {
		console.log(this.props);
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
				<Animated.View
					style={(styles.infoContainer, { top: scrollY, opacity })}
				>
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

/* const mapDispatchToProps = dispatch => ({
	addImagesToExistingAlbum: (albumId, photosArray) =>
		dispatch(addImagesToExistingAlbum(albumId, photosArray))
}); */

const mapStateToProps = state => ({ data: state.upload });

const UploadProgressContainer = connect(mapStateToProps)(UploadProgressMain);

export default UploadProgressContainer;
