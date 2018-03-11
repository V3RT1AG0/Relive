// @flow
import React, { Component } from "react";
import { Button, View } from "react-native";
import { Text } from "react-native";

export default class GalleryActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subAlbumId: "5aa2228977fba53330767411"
		};
	}

	componentDidMount() {
		this.props.getInitialPhotos(this.state.subAlbumId);
	}

	render() {
		return <Text>Done</Text>;
	}
}
