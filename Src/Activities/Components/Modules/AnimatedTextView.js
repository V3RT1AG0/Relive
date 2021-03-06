// @flow
import React from "react";
import {
	View,
	Text,
	Animated,
	Easing,
	TextInput,
	TouchableHighlight
} from "react-native";

export default class VideoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.animatableValue = new Animated.Value(0);
	}

	state = {
		examples: ["Birthday..", "Farewell..", "Nightout..", "Trekking.."],
		index: 0
		//text:""
	};

	componentDidMount() {
		this.startFadeAnimation();
	}

	startFadeAnimation = () => {
		this.animatableValue.setValue(0);
		Animated.timing(this.animatableValue, {
			toValue: 1,
			duration: 3000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(animation => {
			this.setState({
				index:
					this.state.index < this.state.examples.length - 1
						? this.state.index + 1
						: 0
			});
			animation.finished
				? this.startFadeAnimation()
				: this.animatableValue.setValue(0.5);
			//setState index to some empty index
		});
	};

	_onPressButton = () => {
		this.animatableValue.stopAnimation();
	};

	render() {
		const TextOpacity = this.animatableValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 1, 0]
		});

		const { examples, index } = this.state;
		//console.log(index, TextOpacity)
		return (
			<View
				style={{
					flex: 6,
					paddingStart: 10,
					paddingEnd: 10,
					justifyContent: "center"
				}}
			>
				<Animated.View
					style={{
						opacity: TextOpacity
					}}
				>
					<TextInput
						//autoFocus={true}
						style={{ height: 40, fontSize: 30, paddingBottom: 0 }}
						onFocus={this._onPressButton}
						underlineColorAndroid="transparent"
						placeholder={examples[index]}
					>
						{/*  onChangeText={(text) => this.setState({text})}
                    value={this.state.text}>*/}
					</TextInput>
					{/* TODO albumName will need to be sent up onCreateAlbum button preess*/}
				</Animated.View>
			</View>
		);
	}
}
