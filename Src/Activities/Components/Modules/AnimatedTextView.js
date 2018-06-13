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
		index: 0,
		animating: true
		//text:""
	};

	componentDidMount() {
		this.startFadeAnimation();
	}

	//Todo Code for stopping the animation when album options is opened
	/*static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps, "GETDERIVERDSTATEFROMPROS");
		nextProps.showingAlbumOptions
			? this.startFadeAnimation()
			: this.animatableValue.stopAnimation();
		return null;
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, "GETDERIVERDSTATEFROMPROS");
		nextProps.showingAlbumOptions
			? this.animatableValue.stopAnimation()
			: this.startFadeAnimation();
	}*/

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
		this.setState({ animating: false });
		//this._textInput.setNativeProps({ defaultValue: "" });
	};

	render() {
		console.log(this.props, "render");
		const TextOpacity = this.animatableValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 1, 0]
		});

		const { examples, index, animating } = this.state;
		const defaultValue = animating ? examples[index] : "";
		const fontColor = animating ? "#9E9E9E" : "black";

		//console.log(index, TextOpacity)
		return (
			<View
				style={{
					flex: 6,
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
						//ref={component => (this._textInput = component)}
						style={{
							height: 50,
							fontSize: 30,
							paddingBottom: 0,
							//textAlign: "center",
							color: fontColor
							//fontWeight: "100"
						}}
						multiline={false}
						clearTextOnFocus
						defaultValue={defaultValue}
						onFocus={this._onPressButton}
						underlineColorAndroid="transparent"
                       	onChangeText={this.props.onChangeAlbumText}
						//placeholder={examples[index]}
						//placeholder={examples[index]}
						placeholder={"Name your day"}
					/>
					{/*  onChangeText={(text) => this.setState({text})}
                    value={this.state.text}>*/}
					{/* </TextInput> */}
					{/* TODO albumName will need to be sent up onCreateAlbum button preess*/}
				</Animated.View>
			</View>
		);
	}
}
