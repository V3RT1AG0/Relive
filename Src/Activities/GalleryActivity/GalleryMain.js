// @flow
import React, { Component } from "react";
import { Button, View } from "react-native";
import { Text } from "react-native";

export default class GalleryActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AlbumId: "5ab6189d17afaf3b5720484e"
		};
	}

	componentDidMount() {
		this.props.getInitialPhotos(this.state.AlbumId);
	}

	componentWillUnmount() {
		//maybe leave the joined subalbum group or in addition to that disconnect socket connection
	}

	render() {
		return <Text>Done</Text>;
	}
}
