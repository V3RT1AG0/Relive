// @flow
import React, { Component } from "react";
import ImprovedGrid from "../Modules/PhotoGrid";

import {
	Image,
	TouchableWithoutFeedback,
	Text,
	CameraRoll,
	View,
	Dimensions,
	ScrollView,
	TextInput
} from "react-native";
import { NavigationBar, Title } from "@shoutem/ui";
import ImagePathSelector from "../Modules/ImagePathSelector";
import { Picker } from "native-base";

const Item = Picker.Item;

import Albums from "react-native-albums";
//used to get albums list from native side

const { width } = Dimensions.get("window");

//const equalWidth = (width - 10) / 3;

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.imageWidth =
			(width - 2 * (props.galleryMargin + props.galleryPadding)) /
			props.numColumns;
		this.state = {
			items: [],
			selectedImages: [],
			after: "",
			page: 0,
			RNAlbums: []
		};
	}

	handleOnOptionSelected = selectedData => {
		//console.log(selectedData + "selectedData2");
		this.setState(
			{
				selectedData,
				items: [],
				after: "",
				page: 0
			},
			() => {
				//console.log("callback", this.state.selectedData, this.state.items);
				this.getImagesFromCameraRoll();
			}
		);
		//console.log(this.state.selectedData + "yyyx");
	};

	componentDidMount() {
		Albums.getAlbumList({
			count: false,
			thumbnail: false,
			thumbnailDimensions: false
		}).then(list => {
			//console.log(list);
			const dataItems = list.map((item, i) => (
				<Item key={i + 1} label={item.name} value={item.name} />
			));
			this.setState({
				RNAlbums: [<Item key={0} label="Recents" value="" />, ...dataItems]
			});
			this.getImagesFromCameraRoll();
		});
	}

	getImagesFromCameraRoll = () => {
		const selectedDataName = this.state.selectedData
			? this.state.selectedData
			: undefined;
		//console.log(this.state.selectedData + "yyy");
		CameraRoll.getPhotos({
			first: 20,
			after: this.state.after,
			//groupTypes: "All",
			assetType: "All",
			groupName: selectedDataName
		})
			.then(r => {
				//this.setState({ photos: r.edges });
				console.log(r);
				const items = r.edges.map((item, i) => ({
					id: this.state.page + i,
					src: item.node.image.uri,
					selected: false,
					mime: item.node.type
				}));

				this.setState({
					items: [...this.state.items, ...items],
					after: r.page_info.end_cursor,
					page: this.state.items.length + items.length
				});
			})
			.catch(err => {
				//	console.log("Error Loading Images", err);
			});
	};

	onEndReached = () => {
		//console.log("onEndReached");
		this.getImagesFromCameraRoll();
	};

	render() {
		const selectedData = this.state.selectedData
			? this.state.selectedData
			: this.state.RNAlbums[0];

		const noOfSelectedImages = this.state.selectedImages.length;
		//console.log(selectedData, "xxx");

		return (
			<View>
				<View
					style={{
						backgroundColor: "transparent",
						height: 20
					}}
				/>
				<View
					style={{
						margin: this.props.galleryMargin,
						borderRadius: 10,
						padding: this.props.galleryPadding,
						backgroundColor: "white",
						elevation: 8
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginRight: 10
						}}
					>
						<ImagePathSelector
							data={this.state.RNAlbums}
							onNewAlbumSelected={this.handleOnOptionSelected}
							selectedData={selectedData}
							//parameters are being passed to getImagesFromCameraRoll from here
						/>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ marginEnd: 5 }}>selected</Text>
							<Text
								style={{
									textAlign: "center",
									height: 18,
									width: 18,
									borderRadius: 18 / 2,
									fontSize: 10,
									backgroundColor: "#546E7A",
									textAlignVertical: "center",
									color: "white"
								}}
							>
								{noOfSelectedImages}
							</Text>
						</View>
					</View>

					<ImprovedGrid
						onScroll={this.props.onScrollUp}
						data={this.state.items}
						initialNumToRender={20}
						onEndReachedThreshold={0.5} //1 to prefetch early
						onEndReached={this.onEndReached}
						renderItem={this.renderFlatListItem}
						numColumns={this.props.numColumns}
					/>
				</View>
			</View>
		);
	}

	renderHeader = () => <Text>I'm on top!</Text>;

	onButtonPress = itemData => {
		const id = itemData.item.id;
		//console.log("button pressed", id);
		const newItems = [...this.state.items];
		newItems[id].selected = !newItems[id].selected; //toggle selected true or false

		//then insert or remove the clicked item src link to or from the selectedImagesArray
		/* const selectedImages = newItems[id].selected ?
            [...this.state.selectedImages, itemData.item.src] :
            this.state.selectedImages.filter(element => {
                return element !== itemData.item.src
            }); */
		newItems[id].selected
			? this.props.onImageAdded(itemData.item)
			: this.props.onImageRemoved(itemData.item);
		this.setState({ items: newItems });
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
				source={require("../../../Assets/Images/checked.png")}
				//require only once and try if performance imporoves
			/>
		);
		const tick = itemData.item.selected ? marker : null;

		return (
			<TouchableWithoutFeedback onPress={() => this.onButtonPress(itemData)}>
				<View style={{ height: this.imageWidth, width: this.imageWidth }}>
					<Image
						resizeMode="cover"
						resizeMethod="resize"
						style={{ flex: 1 }}
						source={{ uri: itemData.item.src }}
					/>
					{tick}
				</View>
			</TouchableWithoutFeedback>
		);
	};
}
