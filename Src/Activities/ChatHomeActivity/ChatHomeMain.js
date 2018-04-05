// @flow
import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TextInput,
	TouchableNativeFeedback
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { ChatRealm } from "../ChatMainActivity/ChatModel";
import { fetchNewChatListFromNetwork } from "./ChatHomeUtils";

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//chatList: ChaltListRealm.objects("ChatList")
		};
	}

	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<Icon
						name="ios-arrow-round-back"
						style={{ fontSize: 36, marginLeft: 18, marginTop: 4 }}
					/>

					<TextInput
						style={{ marginLeft: 30, width: 280 }}
						value="Search people"
					/>
				</View>
			</TouchableNativeFeedback>
		),
		headerRight: (
			<TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
				<View style={{ alignItems: "center", marginRight: 18 }}>
					<Text>
						<Icon name="ios-add-outline" style={{ fontSize: 35 }} />
					</Text>
				</View>
			</TouchableNativeFeedback>
		),
		headerStyle: {
			borderBottomWidth: 0,
			elevation: 0,
			height: 60
		}
	});

	forceUpdateRealm = () => {
		this.forceUpdate(() => {
			console.log("StateChanged=>", this.state.chatList);
		});
	};

	componentDidMount = () => {
		ChatRealm.addListener("change", this.forceUpdateRealm);

		fetchNewChatListFromNetwork(this.state.userID, this.state.chatList)
			.then(() => {
				//set up socket to listen to updates
				//setUpSocketforNewConversation(this.state.AlbumId);
				//TODO: Pull to update chatlist or realtime using sockets?
				// pass realm photos to setState in case it was empty array initially
				const chatList = ChatRealm.objectForPrimaryKey(
					"ChatList",
					this.state.userID
				);
				this.setState({ chatList }, () => {
					console.log("setStateTriggered=>", this.state.chatList);
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	componentWillUnmount = () => {
		ChatRealm.removeListener("change", this.forceUpdateRealm);
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "white"
				}}
			>
				<FlatList
					data={[
						{
							key: "Devin",
							message: "Let's meet asap.",
							unread: true,
							ts: "2h"
						},
						{
							key: "Jackson",
							message: "Hey, how is it going?",
							unread: true,
							ts: "3h"
						},
						{ key: "D3", message: "Will ttyl in 10 mins.", ts: "Yesterday" },
						{ key: "Joel", message: "Sure will come.", ts: "Yesterday" },
						{ key: "John", message: "Tonight by 9pm.", ts: "2w" },
						{ key: "Jillian", message: "Don't forget to get it.", ts: "22w" },
						{ key: "Jimmy", message: "Catch you tomorrow, bye.", ts: "25w" },
						{ key: "Julie", message: "Let's meet asap.", ts: "30w" }
					]}
					renderItem={({ item }) => (
						<TouchableNativeFeedback
							onPress={() =>
								this.props.navigation.navigate("Chat", { data: item.key })
							}
						>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									padding: 12,
									opacity: item.unread ? 1 : 0.6
								}}
							>
								<View style={style.imageView}>
									<Image
										source={require("../../Assets/Images/download.jpeg")}
										style={style.image}
									/>
								</View>
								<View style={style.textView}>
									<View style={{ flex: 1, flexDirection: "row" }}>
										<View style={{ flex: 1, alignItems: "flex-start" }}>
											<Text style={style.text}>{item.key}</Text>
										</View>
										<View
											style={{
												flex: 1,
												alignItems: "flex-end",
												marginTop: 20,
												marginRight: 10
											}}
										>
											<Text
												style={{
													fontWeight: item.unread ? "400" : "normal",
													color: "#000"
												}}
											>
												{item.ts}
											</Text>
										</View>
									</View>

									<View
										style={{
											flex: 1,
											flexDirection: "row",
											alignItems: "center"
										}}
									>
										<View style={{ flex: 1, marginTop: -20 }}>
											<Text
												style={{
													color: "#000",
													fontWeight: item.unread ? "500" : "normal"
												}}
											>
												{item.message}
											</Text>
										</View>
										{/*   <View
                      style={{
                        flex: 1,
                        alignItems: "flex-end"
                      }}
                    >
                      <Text style={style.textUnread}>1</Text>
                    </View> */}
									</View>
								</View>
							</View>
						</TouchableNativeFeedback>
					)}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	parentView: {
		flex: 1,
		flexDirection: "row"
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30
	},
	imageView: {
		marginRight: 18
	},
	textView: {
		flex: 1
	},
	textUnread: {
		backgroundColor: "black",
		color: "white",
		borderRadius: 50,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
		fontSize: 10
	},
	text: {
		fontSize: 18,
		color: "black",
		fontWeight: "400",
		marginTop: 4
	}
});
