// @flow
import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export default class ContactScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Contacts",
		headerRight: (
			<TouchableOpacity
				onPress={() => navigation.navigate("Contact")}
				style={{
					borderColor: "black",
					marginRight: 25
				}}
			>
				<View>
					<Text>
						<Icon name="md-more" style={{ color: "black", fontSize: 30 }} />
					</Text>
				</View>
			</TouchableOpacity>
		)
	});

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "white" }}>
				<FlatList
					data={[
						{ key: "Devin" },
						{ key: "Jackson" },
						{ key: "James" },
						{ key: "Joel" },
						{ key: "John" },
						{ key: "Jillian" },
						{ key: "Jimmy" },
						{ key: "Julie" },
						{ key: "Devinn" },
						{ key: "Jacksonn" },
						{ key: "Jamess" },
						{ key: "Joell" },
						{ key: "Johnn" },
						{ key: "Jilliann" },
						{ key: "Jimmyy" },
						{ key: "Juliee" }
					]}
					renderItem={({ item }) => (
						<View style={style.parentView}>
							<View style={style.imageView}>
								<Image
									source={require("../Images/download.jpeg")}
									style={style.image}
								/>
							</View>

							<View style={style.textView}>
								<View style={{ flex: 1, flexDirection: "row" }}>
									<View style={{ flex: 1, alignItems: "flex-start" }}>
										<Text style={style.text}>{item.key}</Text>
									</View>
								</View>

								<View
									style={{
										flex: 1,
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<View style={{ flex: 1 }}>
										<Text>{item.key}</Text>
									</View>
								</View>
							</View>
						</View>
					)}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	parentView: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 10,
		paddingBottom: 10
	},
	imageView: {
		flex: 2,
		alignItems: "center"
	},
	image: {
		width: 55,
		height: 55,
		borderRadius: 30,
		padding: 5
	},
	textView: {
		flex: 7,
		borderBottomColor: "#D3D3D3",
		borderBottomWidth: 0.5
	},
	textUnread: {
		backgroundColor: "black",
		margin: 5,
		color: "white",
		borderRadius: 50,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
		fontSize: 10
	},
	text: {
		fontWeight: "900",
		fontSize: 18,
		color: "black"
	}
});
