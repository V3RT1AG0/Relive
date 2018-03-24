// @flow
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export default class ShareTo extends React.Component {
	_keyExtractor = (item, index) => index.toString();

	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Image
					style={styles.profileImage}
					source={{ uri: this.props.item.dp }}
				/>
				<Text style={styles.userName}>{this.props.item.name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white"
	},
	profileImage: {
		width: 50,
		height: 50,
		marginBottom: 9,
		borderRadius: 50 / 2
	}
});
