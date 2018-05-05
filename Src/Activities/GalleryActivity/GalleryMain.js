// @flow
import React, { Component } from "react";
import {
	View,
	Image,
	Dimensions,
	TouchableWithoutFeedback
} from "react-native";
import { GalleryRealm } from "./GalleryModels";
import {
	fetchNewPhotosDataFromNetwork,
	setUpSocketforImageUpdates
} from "./GalleryUtils";
import PhotoGrid from "../Components/Modules/PhotoGrid";
import { SERVER_URL } from "../../Config/Constants";
import { UploadRealm } from "../UploadActivity/UploadModel";
const { width } = Dimensions.get("window");

export default class GalleryActivity extends Component {
	constructor(props) {
		super(props);
		this.imageWidth = (width - 2 * (5 + 5)) / 3;
		this.state = {
			AlbumId: "5aec06c4ece791191adaa45a",

			//check of realm contains the album or not if yes load that album else an empty array

			pendingImages: UploadRealm.objectForPrimaryKey(
				"Album",
				"5aec06c4ece791191adaa45a"
			).photos,
			images: GalleryRealm.objectForPrimaryKey(
				"Album",
				"5aec06c4ece791191adaa45a"
			)
				? GalleryRealm.objectForPrimaryKey("Album", "5aec06c4ece791191adaa45a")
						.photos
				: []
		};
	}

	forceUpdateRealm = () => {
		this.forceUpdate(() => {
			console.log("forceUpdate");
		});
	};

	componentDidMount = () => {
		GalleryRealm.addListener("change", this.forceUpdateRealm);

		// fetch new data from network and put it into realm
		fetchNewPhotosDataFromNetwork(this.state.AlbumId, this.state.images)
			.then(() => {
				//set up socket to listen to updates
				setUpSocketforImageUpdates(this.state.AlbumId);

				// pass realm photos to setState in case it was empty array initially
				const images = GalleryRealm.objectForPrimaryKey(
					"Album",
					"5aec06c4ece791191adaa45a"
				).photos;
				this.setState({ images }, () => {
					console.log("setStateTriggered=>", this.state.images);
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	componentWillUnmount = () => {
		GalleryRealm.removeListener("change", this.forceUpdateRealm);
		//maybe leave the joined subalbum group or in addition to that disconnect socket connection
	};

	renderFlatListItem = itemData => {
		const marker = (
			<Image
				style={{
					position: "absolute",
					top: 5,
					right: 5,
					backgroundColor: "transparent",
					width: 25,
					height: 25
				}}
				source={require("../../Assets/Images/checked.png")}
				//require only once and try if performance imporoves
			/>
		);
		const tick = itemData.item.selected ? marker : null;
		const uri = itemData.item.src
			? itemData.item.src
			: "https://s3.us-east-2.amazonaws.com/crewal-test/" + itemData.item.url;
		console.log("itemData=>", SERVER_URL + "/" + itemData.item.url);
		return (
			//TODO ONCLICK = IT WILL OPEN IMAGE ON CLICK AND NOT GET SELECTED. MAYBE LONG PRESS TO SELECT?
			<TouchableWithoutFeedback onPress={() => this.onButtonPress(itemData)}>
				<View style={{ height: this.imageWidth, width: this.imageWidth }}>
					<Image
						resizeMode="cover"
						resizeMethod="resize"
						style={{ flex: 1 }}
						source={{
							uri
						}}
					/>
					{tick}
				</View>
			</TouchableWithoutFeedback>
		);
	};

	/* renderPendingImages = itemData => {
		const marker = (
			<Image
				style={{
					position: "absolute",
					top: 5,
					right: 5,
					backgroundColor: "transparent",
					width: 25,
					height: 25
				}}
				source={require("../../Assets/Images/checked.png")}
				//require only once and try if performance imporoves
			/>
		);
		const tick = itemData.item.selected ? marker : null;
		console.log("itemData=>", itemData.item);
		return (
			<TouchableWithoutFeedback onPress={() => this.onButtonPress(itemData)}>
				<View style={{ height: this.imageWidth, width: this.imageWidth }}>
					<Image
						resizeMode="cover"
						resizeMethod="resize"
						style={{ flex: 1 }}
						source={{
							uri: itemData.item.src
						}}
					/>
					{tick}
				</View>
			</TouchableWithoutFeedback>
		);
	}; */

	render() {
		console.log("render=>" + this.state.images);
		return (
			<View>
				<PhotoGrid
					data={[...this.state.images, ...this.state.pendingImages]}
					renderItem={this.renderFlatListItem}
					numColumns={3}
				/>

				{/* 	<PhotoGrid
					data={this.state.pendingImages}
					renderItem={this.renderPendingImages}
					numColumns={3}
				/> */}
			</View>
		);
	}
}
