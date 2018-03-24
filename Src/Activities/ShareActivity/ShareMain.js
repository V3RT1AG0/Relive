// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AlbumDetailsForm from "../Components/Modules/AlbumDetailsForm";
import ShareTo from "./ShareTo";

export default class ShareActivity extends React.Component {
	state = {
		albumsArray: [],
		data: [
			{
				name: "Aditya",
				dp: "https://sharekoube.files.wordpress.com/2012/03/berserker.jpg"
			},
			{
				name: "Aditya",
				dp: "https://sharekoube.files.wordpress.com/2012/03/berserker.jpg"
			},
			{
				name: "Aditya",
				dp: "https://sharekoube.files.wordpress.com/2012/03/berserker.jpg"
			},
			{
				name: "Aditya",
				dp: "https://sharekoube.files.wordpress.com/2012/03/berserker.jpg"
			}
		]
	};

	componentDidMount() {
		const albumsArray = this.state.data.map(item => <ShareTo item={item} />);
		this.setState({ albumsArray });
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.subContainers, styles.topContainer]}>
					<AlbumDetailsForm />
				</View>
				<View style={[styles.subContainers, styles.shareToContainer]}>
					<Text style={styles.shareToText}>Share To</Text>
				</View>
				<View style={[styles.subContainers, styles.middleContainer]}>
					<Text style={styles.innerContainerTitleText}>EXISTING ALBUM</Text>
					<View style={styles.horizontalCardsContainer}>
						{this.state.albumsArray}
						{/* <ScrollableProfiles data={this.state.data}/>*/}
					</View>
				</View>
				<View style={styles.lineBreak} />
				<View style={[styles.subContainers, styles.bottomContainer]}>
					<Text style={styles.innerContainerTitleText}>CHAT</Text>
					<View style={styles.horizontalCardsContainer}>
						{this.state.albumsArray}
						{/*<ScrollableProfiles data={this.state.data}/>*/}
					</View>
				</View>
			</View>
		);
	}

	//TODO change width to flex 1 for images
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		flexDirection: "column"
	},
	subContainers: {
		flexDirection: "column",
		justifyContent: "center"
	},
	topContainer: {
		flex: 5
	},
	middleContainer: {
		flex: 3
	},
	bottomContainer: {
		flex: 3
	},
	innerContainerTitleText: {
		fontSize: 11,
		marginStart: 17,
		marginBottom: 15,
		textAlignVertical: "center",
		fontWeight: "bold"
	},
	shareToContainer: {
		marginBottom: 15,
		height: 30,
		justifyContent: "center"
	},
	horizontalCardsContainer: {
		flexDirection: "row"
	},
	shareToText: {
		marginStart: 17,
		fontFamily: "Roboto"
	},
	lineBreak: {
		marginStart: 10,
		marginEnd: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eceff1"
	}
});
