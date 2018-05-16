// @flow
import React from "react";
import AutoTags from "./AutoCompleteTag";
import {
    View,
    KeyboardAvoidingView,
    TouchableNativeFeedback
} from "react-native";
import AnimatedTextView from "./AnimatedTextView";
//import Icon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Entypo";

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
            albumName: "",
            showAlbumOptions: false
        };
        /* setTimeout(() => {
            this.setState({ uploadNotifCount: this.state.uploadNotifCount + 1 });
        }, 5000); */
    }

    handleDelete = index => {
        const tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({tagsSelected});
    };

    handleAddition = suggestion => {
        console.log(suggestion);
        this.setState({
            tagsSelected: [...this.state.tagsSelected, suggestion]
        });
    };

    onChangeAlbumText = albumName => {
        this.setState({albumName});
    };

    handleOptionButtonPressed = () => {
        console.log("setState called");
        this.setState({showAlbumOptions: true});
        this.props.navigator.showModal({
            screen: "AlbumOptionsDialog", // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                modalPresentationStyle: "fullScreen",
                navBarHidden: true,
                topBarElevationShadowEnabled: false,
                navBarNoBorder: true,
                screenBackgroundColor: "rgba(52, 52, 52, 0.5)"
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: "screen" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
    };

    render() {
        return (
            <View style={{margin: 15, borderRadius: 36 / 2}}>
                <TouchableNativeFeedback onPress={this.handleOptionButtonPressed}
                                         background={TouchableNativeFeedback.Ripple('#FFF', true)}>
                    <View
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 36 / 2,
                            alignSelf: "flex-end",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ECEFF1"
                        }}
                    >
                        {/* <Icon style={{}} name="lock" size={20} color="black" /> */}
                        <Icon
                            style={{}}
                            name="dots-three-horizontal"
                            size={20}
                            color="black"
                        />
                    </View>
                </TouchableNativeFeedback>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10
                    }}
                >
                    <AnimatedTextView showingAlbumOptions={this.state.showAlbumOptions}/>
                    {/*Get albumname here*/}
                </View>
                <View style={{flexDirection: "row"}}>
                    {/*<Text style={{fontSize: 15,marginStart:15,color:"#90A4AE",paddingTop:10}}>with</Text>*/}
                    <AutoTags
                        autoFocus={false}
                        suggestions={this.state.suggestions}
                        tagsSelected={this.state.tagsSelected}
                        handleAddition={this.handleAddition}
                        handleDelete={this.handleDelete}
                        placeholder="Add People, Group tag"
                    />
                </View>
            </View>
        );
    }
}
