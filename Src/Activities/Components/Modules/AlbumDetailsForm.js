// @flow
import React from "react";
import AutoTags from "./AutoCompleteTag";
import { View, KeyboardAvoidingView } from "react-native";
import AnimatedTextView from "./AnimatedTextView";
import Icon from "react-native-vector-icons/Feather";

export default class Display extends React.Component {
	constructor() {
		super();

		this.state = {
			suggestions: [
				{
					name: "Aditya"
				},
				{
					name: "Kushal"
				},
				{
					name: "D3"
				}
			],
			tagsSelected: [],
			albumName: ""
		};
		/* setTimeout(() => {
            this.setState({ uploadNotifCount: this.state.uploadNotifCount + 1 });
        }, 5000); */
	}

	handleDelete = index => {
		const tagsSelected = this.state.tagsSelected;
		tagsSelected.splice(index, 1);
		this.setState({ tagsSelected });
	};

	handleAddition = suggestion => {
		console.log(suggestion);
		this.setState({
			tagsSelected: [...this.state.tagsSelected, suggestion]
		});
	};

	onChangeAlbumText = albumName => {
		this.setState({ albumName });
	};

	render() {
		return (
			<View>
				<View
					style={{
						height: 40,
						width: 40,
						borderRadius: 40 / 2,
						alignSelf: "flex-end",
						justifyContent: "center",
						marginRight: 20,
						alignItems: "center",
						marginBottom: 50,
						backgroundColor: "#ECEFF1"
					}}
				>
					<Icon style={{}} name="lock" size={20} color="black" />
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20
					}}
				>
					<AnimatedTextView />
					{/*Get albumname here*/}
				</View>
				<View style={{ flexDirection: "row" }}>
					{/*<Text style={{fontSize: 15,marginStart:15,color:"#90A4AE",paddingTop:10}}>with</Text>*/}
					<AutoTags
						autoFocus={false}
						suggestions={this.state.suggestions}
						tagsSelected={this.state.tagsSelected}
						handleAddition={this.handleAddition}
						handleDelete={this.handleDelete}
						placeholder="Add a tag.."
					/>
				</View>
			</View>
		);
	}
}
