// @flow
import React, { Component } from "react";
import { Text } from "react-native";
import { GalleryRealm } from "./GalleryModels";
import {
	fetchNewPhotosDataFromNetwork,
	setUpSocketforImageUpdates
} from "./GalleryUtils";

export default class GalleryActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AlbumId: "5ab6189d17afaf3b5720484e",

			//check of realm contains the album or not if yes load that album else an empty array
			images: GalleryRealm.objectForPrimaryKey(
				"Album",
				"5ab6189d17afaf3b5720484e"
			)
				? GalleryRealm.objectForPrimaryKey("Album", "5ab6189d17afaf3b5720484e")
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
					"5ab6189d17afaf3b5720484e"
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

	render() {
		console.log("render=>" + this.state.images);
		return <Text>Done</Text>;
	}
}
