import React from "react";
import AutoTags from "../AutoCompleteTag";
import {
    Text, TextInput,
    View,KeyboardAvoidingView
} from "react-native";
import AnimatedTextView from './AnimatedTextView'

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

        };
        /* setTimeout(() => {
            this.setState({ uploadNotifCount: this.state.uploadNotifCount + 1 });
        }, 5000); */
    }


    handleDelete = index => {
        let tagsSelected = this.state.tagsSelected;
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

    render() {


        return (
            <View>
                <View style={{flexDirection: "row", alignItems: "center",marginBottom:17}}>

                    <AnimatedTextView/>
                    {/*Get albumname here*/}

                </View>
                <View style={{flexDirection:"row"}}>
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
