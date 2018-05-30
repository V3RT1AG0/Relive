//@flow
import React from "react";
import {View, TouchableNativeFeedback, Animated} from "react-native";

export const CircleButton = (props) => {
    console.log(props)
    const {top = undefined, bottom = undefined, right = undefined, left = undefined} = props
    const {borderTopLeftRadius = undefined, borderTopRightRadius = undefined, borderBottomLeftRadius = undefined, borderBottomRightRadius= undefined} = props
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
                   // height: 40,
                    //width: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    //backgroundColor: "white",
                    //borderRadius: 50/2,
                    top, bottom, right, left,
                    borderBottomLeftRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomRightRadius
                }}
            >
                {props.children}
            </Animated.View>
        </TouchableNativeFeedback>
    )
}
