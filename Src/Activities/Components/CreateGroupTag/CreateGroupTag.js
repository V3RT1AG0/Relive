// @flow
import React, { Component } from "react";
import axios from "axios";
import { Button, View, TextInput, FlatList, Switch, Text } from "react-native";
import { SERVER_URL, MY_ID } from "../../../Config/Constants";

class CreateGroupTag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//use map to add ticked:false to each one
			userIDs: [], //store this ids in redux store first time you fetch user data
			selectedUserID: [], //this contains name and id of user.
			text: "",
			completed: false
		};
	}

	componentDidMount() {
		console.log("didMount");
		this.loadAllUserId();
	}

	loadAllUserId = () => {
		axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});

		axios
			.post(SERVER_URL + "getUserIds", { userId: MY_ID })
			.then(result => {
				console.log(result);
				this.setState({ userIDs: [...result.data.userid] });
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleCreateTagButtonPress = () => {
		//TODO batch images:use array and loop, look for batch option in s3 sdk or look for axios multi request
		//const axios = Axios.create();

		const payload = {
			members: this.state.selectedUserID.map(user => user._id), //send only userid and not name
			name: this.state.text,
			createdBy: MY_ID
		};
		axios
			.post(SERVER_URL + "addTag", payload)
			.then(success => {
				console.log(success);
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleSwitchValueChanged = (isChecked, item) => {
		const { selectedUserID, userIDs } = this.state;
		console.log(item, userIDs);
		if (selectedUserID.includes(item)) {
			const myindex = selectedUserID.indexOf(item);
			selectedUserID.splice(myindex, 1);
			console.log("remove" + selectedUserID[myindex] + "" + myindex);
			this.setState({ selectedUserID: [...selectedUserID] });
		} else {
			this.setState({
				selectedUserID: [...selectedUserID, item]
			});
			console.log(
				"add" + item + " " + this.state.selectedUserID.indexOf(item) != -1
				//this.state.selectedUserID.includes(item)
				//this.state.selectedUserID.filter(data => data._id === item_id)
			);
		}

		this.setState({ userIDs: [...this.state.userIDs] });
	};

	setSwitchValue = item => {
		console.log("triggered1");
		/* 	if (this.state.selectedUserID.includes(item)) return true;
		return false; */
		return this.state.selectedUserID.indexOf(item) != -1;
	};

	_keyExtractor = item => item._id;

	render() {
		console.log(this.state.selectedUserID, "renderer");
		return (
			<View>
				<TextInput
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
				/>
				<Button onPress={this.handleCreateTagButtonPress} title="Create" />
				{/* <Switch
					value={this.state.completed}
					onValueChange={checked => this.setState({ completed: checked })}
				/> */}

				<FlatList
					data={this.state.userIDs}
					keyExtractor={this._keyExtractor}
					renderItem={({ item, index }) => (
						<View>
							<Switch
								value={this.setSwitchValue(item)}
								onValueChange={checked =>
									this.handleSwitchValueChanged(checked, item)
								}
							/>
							<Text>{item.name}</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

export default CreateGroupTag;
