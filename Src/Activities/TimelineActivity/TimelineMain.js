//@flow
import React from "react";
import {Text, View, Image, Animated, Easing} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import TimeLineListView from "./TimeLineListView";
import {Fonts} from '../../Assets/Fonts'
import TimeLineRealm from "./TimeLineModel";
import {loadInitialTimelinefromRealm} from "./TimelineUtil";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {CircleButton} from "../Components/Modules/CircleButton";
import PopoverTooltip from 'react-native-popover-tooltip';
import {UserRealm} from "../ProfileActivity/ProfileModel";
import {MY_ID} from "../../Config/Constants";

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.animatableValue = new Animated.Value(0)
        this.state = {
            AlbunmDate: "26-01-2018",

            albums: TimeLineRealm.objects("Album")
                ? TimeLineRealm.objects("Album")
                : [],
            userInfo: UserRealm.objectForPrimaryKey(
                "User", MY_ID
            )
        };
    }




    startFadeOutAnimation = () => {
       // this.animatableValue.setValue(0);
        Animated.timing(this.animatableValue, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    };

    startFadeInAnimation = () => {
        // this.animatableValue.setValue(0);
        Animated.timing(this.animatableValue, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    };

    componentDidMount() {
        console.log(this.state.albums);
        TimeLineRealm.addListener("change", this.forceUpdateRealm);
        loadInitialTimelinefromRealm()
    }

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("forceUpdateTimeline", this.state.albums);
        });
    };

    static navigatorStyle = {
        navBarHidden: true
    };


    DateChange = date => {
        this.setState({AlbunmDate: date});
    };

    handleOnScrollTimeLine = () => {
        this.startFadeOutAnimation();
    }

    handleOnScrollMomentumEnd = () => {
        console.log("triggered scroll end")
        this.startFadeInAnimation()
    }


    render() {
        const iconWidth = 25;
        const CircleOpacity = this.animatableValue.interpolate({
            inputRange: [0,1],
            outputRange: [1,0.1]
        });
        return (
            <View style={{flex: 1, padding: 5}}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column"
                    }}
                >
                    <TimeLineListView
                        Data={this.state.albums}
                        DateChange={this.DateChange}
                        CurrentlyDisplayedDate={this.state.AlbunmDate}
                        navigator={this.props.navigator}
                        onScroll = {this.handleOnScrollTimeLine}
                        onScrollEnd = {this.handleOnScrollMomentumEnd}
                    />
                </View>

                <CircleButton
                    bottom={10} right={10} opacity={CircleOpacity} onPress={() => this.props.navigator.resetTo({
                    screen: "TimelineGallery",
                })}>
                    <Icon name="stop" style={{fontSize: iconWidth, color: "white"}}/>
                </CircleButton>
                <CircleButton bottom={10} left={10} opacity={CircleOpacity}>
                    <EvilIcons
                        name="search"
                        style={{fontSize: iconWidth, color: "white"}}
                        onPress={() => {
                            this.props.navigator.resetTo({
                                screen: "TimelineGallery",
                            })
                        }}
                    />
                </CircleButton>
                <CircleButton
                    opacity={CircleOpacity}
                    top={10} left={10} onPress={() => {
                    this.refs.NotifToggle.toggle()
                }}
                >
                    <PopoverTooltip
                        ref='NotifToggle'
                        setBelow
                        buttonComponent={
                            <IonIcons name="ios-notifications" style={{fontSize: iconWidth, color: "white"}}/>
                        }
                        items={[
                            {
                                label: 'Item 1',
                                onPress: () => {
                                }
                            },
                            {
                                label: 'Item 2',
                                onPress: () => {
                                }
                            }
                        ]}
                    />
                </CircleButton>
                < CircleButton
                    opacity={CircleOpacity}
                    top={10}
                    right={10}
                    onPress={() => {
                        this.props.navigator.push({
                            screen: "Profile"
                        })
                    }
                    }
                >
                    <Image
                        source={{uri: this.state.userInfo.dp}}
                        style={{
                            flex: 1,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            alignSelf: "stretch"
                        }}
                    />
                </CircleButton>

                <View
                    style={{
                        position: "absolute",
                        top: 180,
                        left: 10,
                        zIndex: 200
                    }}
                >
                    <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: Fonts.RobotoLarge,
                            color: 'black'
                        }}>{this.state.AlbunmDate}</Text>
                    </View>
                </View>
            </View>);
    }
}

