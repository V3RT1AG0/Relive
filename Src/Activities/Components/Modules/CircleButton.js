//@flow
import React from "react";
import {View, TouchableNativeFeedback} from "react-native";

export const CircleButton = (props) => {

    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View
                style={{
                    position: "absolute",
                    zIndex: 200,
                    height: 60,
                    width: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    borderRadius: 60 / 2,
                    ...props
                }}
            >
                {props.children}
            </View>
        </TouchableNativeFeedback>
    )
}
