// @flow
import React, {Component} from "react";
import {Text, View} from "react-native";

export default class AlbumOptions extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white"
                }}
            >
                {this.Options}
            </View>
        );
    }

}
