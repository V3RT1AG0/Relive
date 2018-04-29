// @flow
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	topContainer: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		flex: 1
		//If I remove this flex the child flex wont work
	},
	infoContainer: {},

	bottomGalleyContainer: {
		top: 170
	},
	card: {
		backgroundColor: "transparent",
		height: 150
	},
	albumName: {
		fontSize: 30
	}
});
