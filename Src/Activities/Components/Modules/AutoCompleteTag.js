// @flow
import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from "react-native";
import { Image } from "@shoutem/ui";
import Autocomplete from "./react-native-autocomplete-input";

export default class AutoTags extends Component {
	state = {
		query: ""
	};

	renderTags = () => {
		if (this.props.renderTags) {
			return this.props.renderTags(this.props.tagsSelected);
		}

		const tagMargins = this.props.tagsOrientedBelow
			? { marginBottom: 5 }
			: { marginTop: 5 };

		return (
			<View style={this.props.tagStyles || styles.tags}>
				{/*My code*/}
				{this.props.tagsSelected.length !== 0 ? (
					<Text
						style={{
							fontSize: 15,
							marginStart: 6,
							color: "#90A4AE",
							paddingTop: 10
						}}
					>
						with
					</Text>
				) : (
					undefined
				)}
				{this.props.tagsSelected.map((t, i) => (
					<TouchableHighlight
						key={i}
						style={[tagMargins, styles.tag]}
						onPress={() => this.props.handleDelete(i)}
					>
						<Text>{t.name}</Text>
					</TouchableHighlight>
				))}
			</View>
		);
	};

	handleInput = text => {
		if (this.props.allowBackspace) {
			//TODO: on ios, delete last tag on backspace event && empty query
			//(impossible on android atm, no listeners for empty backspace)
		}

		this.props.onChangeText
			? this.props.onChangeText(text)
			: this.setState({ query: text });
	};

	filterData = query => {
		if (!query || query.trim() == "" || !this.props.suggestions) {
			return;
		}
		if (this.props.filterData) {
			return this.props.filterData(query);
		}
		const suggestions = this.props.suggestions;
		const results = [];
		query = query.toUpperCase();
		suggestions.forEach(i => {
			if (i.name.toUpperCase().includes(query)) {
				results.push(i);
			}
		});
		return results;
	};

	addTag = tag => {
		this.props.handleAddition(tag);
		this.setState({ query: "" });
	};

	render() {
		const { query } = this.state;
		const data = this.filterData(query);
		console.log(this.props.tagsSelected);
		return (
			<View style={styles.AutoTags}>
				{!this.props.tagsOrientedBelow &&
					this.props.tagsSelected &&
					this.renderTags()}
				<Autocomplete
					data={data}
					placeholder={this.props.placeholder}
					defaultValue={query}
					onChangeText={text => this.handleInput(text)}
					multiline={false}
					autoFocus={this.props.autoFocus !== false}
					renderItem={suggestion => (
						<TouchableOpacity onPress={e => this.addTag(suggestion)}>
							{this.props.renderSuggestion ? (
								this.props.renderSuggestion(suggestion)
							) : (
								<View style={styles.suggestionListItems}>
									<Image
										style={{ height: 30, width: 30 }}
										styleName="small-avatar"
										source={{
											uri:
												"https://sharekoube.files.wordpress.com/2012/03/berserker.jpg"
										}}
									/>
									<Text style={{ fontSize: 15, paddingStart: 10 }}>
										{suggestion.name}
									</Text>
								</View>
							)}
						</TouchableOpacity>
					)}
					inputContainerStyle={
						this.props.inputContainerStyle || styles.inputContainerStyle
					}
					containerStyle={this.props.containerStyle || styles.containerStyle}
					underlineColorAndroid="transparent"
					style={{ backgroundColor: "#ffffff" }}
					listContainerStyle={{
						backgroundColor: this.props.tagsOrientedBelow
							? "#ffffff"
							: "transparent"
					}}
					{...this.props}
				/>
				{this.props.tagsOrientedBelow &&
					this.props.tagsSelected &&
					this.renderTags()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	AutoTags: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start"
	},
	tags: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		backgroundColor: "#ffffff",
		width: "100%" //300r
	},
	tag: {
		backgroundColor: "rgb(244, 244, 244)",
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		marginLeft: 5,
		borderRadius: 30,
		padding: 8
	},
	inputContainerStyle: {
		borderRadius: 0,
		paddingLeft: 0,
		height: 45,
		width: "100%", //300
		justifyContent: "center",
		borderColor: "transparent",
		alignItems: "stretch"
		//backgroundColor: "#efeaea"
	},
	containerStyle: {
		minWidth: 200
		//margin: 10
		//maxWidth: 300
		//300
	},
	suggestionListItems: {
		flexDirection: "row",
		alignItems: "center",
		height: 40,
		padding: 5
	}
});
