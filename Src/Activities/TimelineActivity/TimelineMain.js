// @flow
import React, { Component } from "react";
import {} from "react-native";
import { SERVER_URL, MY_ID } from "../../Config/Constants";
import { View } from "react-native";
import { Text } from "react-native";

class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = { data: {} };
		console.log("constructor called");
	}

	componentDidMount() {
		//this.fetchTimelineInitialData();
		console.log("Component did mount");
		this.props.getInitialTimeline();
	}

	render() {
		const { timelineData } = this.props;
		return (
			<View>
				<Text>Done</Text>
			</View>
		);
	}
}
export default TimeLine;
