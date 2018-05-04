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
const { width } = Dimensions.get("window");

export default class GalleryActivity extends Component {
	constructor(props) {
		super(props);
		this.imageWidth = (width - 2 * (5 + 5)) / 3;
		this.state = {
			AlbumId: "5aec06c4ece791191adaa45a",

			//check of realm contains the album or not if yes load that album else an empty array
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
		console.log("itemData=>", SERVER_URL + "/" + itemData.item.url);
		return (
			<TouchableWithoutFeedback onPress={() => this.onButtonPress(itemData)}>
				<View style={{ height: this.imageWidth, width: this.imageWidth }}>
					<Image
						resizeMode="cover"
						resizeMethod="resize"
						style={{ flex: 1 }}
						source={{
							uri:
								"https://s3.us-east-2.amazonaws.com/crewal-test/" +
								itemData.item.url
						}}
					/>
					{tick}
				</View>
			</TouchableWithoutFeedback>
		);
	};

	render() {
		console.log("render=>" + this.state.images);
		return (
			<View>
				<PhotoGrid
					data={this.state.images}
					renderItem={this.renderFlatListItem}
					numColumns={3}
				/>
			</View>
		);
	}
}
