// @flow
import React, { Component } from "react";
import { View, Image, FlatList } from "react-native";

// sample api http://droidtute.com/reactexample/sample_api/getMovieList.php

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	_keyExtractor = (item, index) => item.id;

	render() {
		//console.log("Photo Grid Flat render");
		return (
			<FlatList
				data={this.props.data}
				//numColumns={3}

				keyExtractor={this._keyExtractor}
				//renderItem={this.props.renderRowItem}
				{...this.props}
				initialNumToRender={20}
				//onEndReachedThreshold={0.2}
				//onEndReached={this.props.onEndReached}
				removeClippedSubviews
				scrollEventThrottle={16}
			/>
		);
	}
}
