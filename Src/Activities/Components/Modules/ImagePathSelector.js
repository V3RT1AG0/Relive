// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "native-base";
const Item = Picker.Item;

const styles = StyleSheet.create({});

export default class ImagePathSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	render() {
		console.log(this.props.selectedData, "selectedData", this.props.data);
		return (
			<Picker
				/* IOS only
				itemStyle={{ backgroundColor: "#b95dd3" }}
				textStyle={{ backgroundColor: "#b95dd3" }}
				headerStyle={{ backgroundColor: "#b95dd3" }} */
				style={{ width: 150 }}
				itemStyle={{ fontStyle: "italic" }}
				mode="dropdown" //dialog
				placeholder="Select One"
				selectedValue={this.props.selectedData}
				onValueChange={selectedData =>
					this.props.onNewAlbumSelected(selectedData)
				}
			>
				{this.props.data}
			</Picker>
		);
	}
}

{
	/* <DropDownMenu
					styleName="horizontal"
					options={this.props.data}
					selectedOption={
						this.props.selectedData
						//this.props.selectedData[0]
						//selectedData ? this.state.selectedData : this.props.data[0]
					}
					onOptionSelected={selectedData =>
						this.props.onNewAlbumSelected(selectedData)
					}
					titleProperty="name"
					valueProperty="name"
				/> */
}
