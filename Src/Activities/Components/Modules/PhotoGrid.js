import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	Dimensions,
	Animated
} from "react-native";

// sample api http://droidtute.com/reactexample/sample_api/getMovieList.php



export default class App extends Component {
	constructor(props) {
		super(props);
	}

	_keyExtractor = (item, index) => item.id;

	renderRowItem = itemData => {
		//console.log(itemData);
		return (
			<View>
				<Image
					style={{ height: 150, width: equalWidth }}
					source={{
						uri: itemData.item.src
					}}
					resizeMode="cover"
					resizeMethod="resize"
				/>
			</View>
		);
	};

	componentWillMount() {
		{
			//this.getMoviesFromApiAsync();
		}
	}

	render() {
		console.log("Photo Grid Flat render");
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
				removeClippedSubviews={true}
				scrollEventThrottle={16}
			/>
		);
	}

	componentWillUpdate() {
		console.log("comppnentWillUpdta");
	}
}


