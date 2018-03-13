// @flow
import React, { Component } from "react";
import Axios from "axios";
import { View, StyleSheet, Image } from "react-native";
import { Examples, Title, Button, Text } from "@shoutem/ui";

export default class ProfileActivity extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Image
						source={{
							uri:
								"https://herlansaja.files.wordpress.com/2008/07/4c047-leejoonki.jpg"
						}}
						style={{ flex: 1 }}
					/>
				</View>
				<View style={styles.bottomContainer}>
					<View style={styles.infoBox} />
					<View style={styles.infoBox} />
					<View style={styles.infoBox} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: "column"
	},
	headerContainer: {
		flexDirection: "row",
		flex: 5
	},
	bottomContainer: {
		flex: 4,
		backgroundColor: "#fff0f5",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	infoBox: {
		flexDirection: "column",
		backgroundColor: "#e0ffff",
		height: "20%",
		width: "20%"
	}
});
