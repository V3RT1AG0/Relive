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

	componentWillUnmount(){
		//maybe leave the joined subalbum group or in addition to that disconnect socket connection
	}

	render() {
		return <Text>Done</Text>;
	}
}
