// @flow
import React, { Component } from "react";
import {} from "react-native";
import { axios } from "axios";
import { SERVER_URL } from "../../Config/Constants";

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
}
export default TimeLine;
