// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import socket from "../../Config/SocketConfig";
import { SERVER_URL } from "../../Config/Constants";
import { ChatRealm } from "../ChatMainActivity/ChatModel";

export class SplashMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "5aa82ea7bfad0122a3757be2"
		};
	}

	getRoomIds = () => {
		const url = SERVER_URL + "/chat/getlist";
		const data = {
			_id: this.state.id
		};
		return axios({
			data,
			url,
			method: "post"
		});
	};

	/*
data:
chatlist:Array(2)
1:{name: "Shivraj", message: Array(1), _id: "5aa82eafbfad0122a3757ce4", readinfo: {…}}
2:{name: "Adityaraj", message: Array(1), _id: "5aa82eafbfad0122a3757ce5", readinfo: {…}}
 */

	subscibeToAllRooms = () => {
		this.getRoomIds()
			.then(result => {
				// enter each room using result chatlist items
				console.log("result=>", result);
				result.data.chatlist.forEach(item => {
					socket.emit("enterChatRooms", item._id);
				});
				this.props.navigator.push({
					screen: "Navigator",
					title: "Navigator"
				});
			})
			.catch(e => console.log(e));
	};

	componentDidMount() {
		socket.on("ChatMessage", (message, roomId) => {
			console.log("message=>", message);
			try {
				const messages = ChatRealm.objectForPrimaryKey("ChatList", roomId)
					.messages;
				ChatRealm.write(() => {
					messages.push(message);
				});
			} catch (e) {
				console.log("Error on creation", e);
			}
		});

		this.subscibeToAllRooms();
	}

	render() {
		return <View />;
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SplashMain);
