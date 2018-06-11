// @flow
import React, {Component} from 'react';
import {
    Animated,
    AppRegistry, Easing,
    StyleSheet,
    Text,
    View
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';

import TimelineActivity from "../Activities/TimelineActivity/TimelineContainer";
import ChatHomeActivity from "../Activities/ChatHomeActivity/ChatHomeMain";
import NotificationMain from "./NotificationActivity/NotificationMain";
import {CircleButton} from "./Components/Modules/CircleButton";


export default class SwiperActivity extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props)
        this.animatableValue = new Animated.Value(1000)
        this.animatableValue2 = new Animated.Value(0)
    }

    /*startRightSlideAnimation = () => {
        this.animatableValue.setValue(0);
        Animated.timing(this.animatableValue, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    };*/

    componentDidMount() {

    }


    onScrollBeginDrag = (e) => {
        console.log(e.nativeEvent);
        if (e.nativeEvent.position === 1) {
            // if right swipe
            if (e.nativeEvent.position === 2 && e.nativeEvent.offset === 0)
                this.animatableValue2.setValue(1000)
            else if (e.nativeEvent.offset === 0)
                this.animatableValue2.setValue(0)
            else
                this.animatableValue2.setValue(e.nativeEvent.offset * 1000);
        }
        else {
            // if left swiped
            if (e.nativeEvent.position === 0 && e.nativeEvent.offset === 0)
                this.animatableValue.setValue(0) // already swiped left and no movement
            else if (e.nativeEvent.offset === 0)
                this.animatableValue.setValue(1000) // original position  and no movement(no movement is already checked in above condition)
            else if (e.nativeEvent.position === 0)
                this.animatableValue.setValue(e.nativeEvent.offset * 1000); //currently swiping so update value continuously
        }

    }

    render() {
        /*const leftMargin = this.animatableValue.interpolate({
            inputRange: [0, 1000],
            outputRange: [0, -140]
        });

        const rightMargin = this.animatableValue2.interpolate({
            inputRange: [0, 1000],
            outputRange: [-140, 0]
        });*/
        const iconWidth = 30;
        const leftColor = this.animatableValue.interpolate({
            inputRange: [870, 1000],
            outputRange: [0,1]
        });

        const leftTextOpacity = this.animatableValue.interpolate({
            inputRange: [0,800],
            outputRange: [1,0]
        });

        const rightColor = this.animatableValue2.interpolate({
            inputRange: [0, 130],
            outputRange: [1,0]
        });
        console.log("swiper triggered")
        return (
            <View style={{flex: 1}}>
                <Swiper  showsPagination={false} loop={false} index={1}
                        scrollEventThrottle={16}
                        onPageScroll={this.onScrollBeginDrag}>
                    <NotificationMain/>
                    <TimelineActivity/>
                    <ChatHomeActivity/>
                </Swiper>
                <CircleButton
                    //opacity={CircleOpacity}
                    opacity={leftColor}
                    top={10} left={15} borderTopRightRadius={25} borderBottomRightRadius={25} onPress={() => {
                    this.props.navigator.push({
                        screen: "NotificationActivity"
                    })
                    // this.refs.NotifToggle.toggle()
                }}>
                    <IonIcons name="ios-notifications" style={{fontSize: iconWidth, color: "#263238"}}/>
                </CircleButton>
                <Animated.Text
                    style={{
                        position: "absolute",
                        opacity: leftTextOpacity,
                        fontSize: 30,
                        top: 10,
                        left: 10
                    }}>Notification</Animated.Text>
                <CircleButton
                    //opacity={CircleOpacity}
                    opacity={rightColor}
                    top={10} right={15} borderTopLeftRadius={25} borderBottomLeftRadius={25} onPress={() => {
                    this.props.navigator.push({
                        screen: "NotificationActivity"
                    })
                    // this.refs.NotifToggle.toggle()
                }}>
                    <Feather name="message-circle" style={{fontSize: iconWidth, color: "#263238"}}/>
                </CircleButton>
            </View>
        );
    }
}
