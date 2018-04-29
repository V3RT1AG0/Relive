// @flow
import React, { Component } from "react";
import { Text, View, Animated, Easing } from "react-native";

export default class AlbumOptions extends Component {
	options = ["Hide Album", "Anyone can add photos", "Anyone can add members"];

	constructor(props) {
		super(props);
		this.Options = this.options.map(item => (
			<View>
				<Text>{item}</Text>
			</View>
		));
		this.deltaY = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.deltaY, {
			toValue: 1,
			duration: 3000,
			easing: Easing.linear
		}).start();
	}

	render() {
		const yPosition = this.deltaY.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 300]
		});
		return (
			<View
				style={{
					backgroundColor: "red",
					//transform: [{ translateY: yPosition }],
					position: "absolute",
					width: "100%",
					height: 200,
					bottom: 0,
					backgroundColor: "white"
				}}
			>
				{this.Options}
			</View>
		);
	}
}
{
	/* <Animated.View style={{ top: yPosition }}>{this.Options}</Animated.View>
	<Animated.View
				style={{
					backgroundColor: "red",
					transform: [{ translateY: yPosition }],
					height: 100,
					width: 100
				}}
			>
				{this.Options}
			</Animated.View>*/
}
{
	/* <Animated.View
				style={{ backgroundColor: "red", transform: [{ translateY: 300 }] }}
			>
				{this.Options}
			</Animated.View> */
}
