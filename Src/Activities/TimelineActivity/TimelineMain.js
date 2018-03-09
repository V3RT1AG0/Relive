// @flow
import React, { Component } from "react";
import {} from "react-native";
import axios from "axios";
import { SERVER_URL, MY_ID } from "../../Config/Constants";
import { View } from "react-native";
import { Text } from "react-native";

class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = { data: {} };
	}

	/* componentWillMount() {
		const payload = {userID: }
		axios
			.post(Constants.SERVER_URL + "getTimeLineData", payload)
			.then(result => {})
			.catch(error => {});
	} */

	componentDidMount() {
		axios.interceptors.request.use(request => {
			console.log("Starting Request", request);
			return request;
		});

		axios
			.get(SERVER_URL + "user/getUserAndTimelineData/" + MY_ID)
			.then(result => {
				console.log(result);
				this.props.getInitialTimeline(result.data.album);
			})
			.catch(error => console.log(error.response));
	}

	render() {
		const { timelineData } = this.props;
		return (
			<View>
				<Text>{JSON.stringify(timelineData)}</Text>
			</View>
		);
	}
}
export default TimeLine;
