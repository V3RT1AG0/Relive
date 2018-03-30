// @flow
import React, { Component } from "react";
import Axios from "axios";
import { View, StyleSheet, Image } from "react-native";
import { Examples, Title, Button, Text } from "@shoutem/ui";
import Interactable from "react-native-interactable";

export default class ProfileActivity extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<Interactable.View
				style={styles.mainContainer}
				verticalOnly
				snapPoints={[
					{ y: -250, damping: 0.4, tension: 1000 },
					{ y: 0, damping: 0.4, tension: 2000 }
				]}
			>
				{/* <Interactable.View
					style={styles.movableBox}
					snapPoints={[{ x: 0 }, { x: 300 }]}
					dragWithSpring={{ tension: 100, damping: 0.5 }}
					springPoints={[{ x: 300, tension: 5000, damping: 0.1 }]}
					frictionAreas={[{ x: 100, damping: 1.0, haptics: true }]}
					//gravityPoints={[{ x: 100, strength: 8000 }]}
					startOnFront
				>
					<View
						style={{ width: "20%", height: "30%", backgroundColor: "black" }}
					/>
				</Interactable.View> */}

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
					{/* <Interactable.View
						horizontalOnly
						style={{ zIndex: 2 }}
						snapPoints={[{ x: -50 }, { x: 100 }]}
						initialPosition={{ x: 0, y: 500 }}
					> */}
					<Interactable.View
						style={styles.infoBox}
						snapPoints={[{ x: 0 }, { x: -100, y: -100 }]}
						startOnFront
					/>
					{/* </Interactable.View> */}
				</View>
			</Interactable.View>
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
		backgroundColor: "black",
		alignItems: "flex-end"
		//justifyContent: "flex-end"
	},
	infoBox: {
		flexDirection: "column",
		backgroundColor: "#e0ffff",
		height: "20%",
		width: "20%"
	},
	movableBox: {
		flex: 1,
		backgroundColor: "#e0ffff",
		width: "20%",
		zIndex: 2
	}
});
//alignItems:flex end is causing snappoint issue but justify content space between is not
//a interactable view can move anywhere within its container view at any point but not outside its container view
//the current position at which the view is created is 0 i.e the center of that view and other cordinates are drawn accoring to that particular view

//Springpoints :damping keeps less to make sure object doesnt become too fluid :tension->imageine a spring connected from a point to that object.more tension = more strength required to pull
