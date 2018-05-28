//@flow
import React from "react";
import {View, TouchableNativeFeedback, Animated} from "react-native";

export const CircleButton = (props) => {
    console.log(props)
    const {top = undefined, bottom = undefined, right = undefined, left = undefined} = props
   // console.log(top, bottom, right, left)
    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <Animated.View

                style={{
                    opacity: props.opacity,
                    position: "absolute",
                    zIndex: 200,
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    borderRadius: 50 / 2,
                    top, bottom, right, left,
                }}
            >
                {props.children}
            </Animated.View>
        </TouchableNativeFeedback>
    )
}
