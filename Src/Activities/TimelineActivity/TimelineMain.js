//@flow
import React from "react";
import {Text, View, Image, Animated, Easing, TouchableNativeFeedback,} from "react-native";


import Icon from "react-native-vector-icons/FontAwesome";
import TimeLineListView from "./TimeLineListView";
import {Fonts} from '../../Assets/Fonts'
import TimeLineRealm from "./TimeLineModel";
import {loadInitialTimelinefromRealm} from "./TimelineUtil";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
//import {CircleButton} from "../Components/Modules/CircleButton";
import PopoverTooltip from 'react-native-popover-tooltip';
import LinearGradient from 'react-native-linear-gradient';


import {UserRealm} from "../ProfileActivity/ProfileModel";
import {MY_ID} from "../../Config/Constants";
import moment from "moment"

const CircleButton = props => {
    console.log(props);
    const {
        top = undefined,
        bottom = undefined,
        right = undefined,
        left = undefined
    } = props;
    const {
        borderTopLeftRadius = undefined,
        borderTopRightRadius = undefined,
        borderBottomLeftRadius = undefined,
        borderBottomRightRadius = undefined
    } = props;
    // console.log(top, bottom, right, left,props.children)

    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            // background={TouchableNativeFeedback.SelectableBackground()}
        >
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
                    top,
                    bottom,
                    right,
                    left,
                    borderBottomLeftRadius,
                    borderTopLeftRadius,
                    borderTopRightRadius,
                    borderBottomRightRadius
                }}
            >
                {props.options === true ?
                    <MaterialIcons
                        name="dots-vertical"
                        style={{fontSize: 35, color: "black"}}
                        onPress={() => {
                            this.props.navigator.resetTo({
                                screen: "TimelineGallery",
                            })
                        }}
                    /> :
                    <View style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40 / 2,
                        backgroundColor: "black",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <IonIcons name="ios-grid-outline" style={{fontSize: 35, color: "white"}}/>
                    </View>
                }
            </Animated.View>
        </TouchableNativeFeedback>
    );
};


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
        navBarHidden: true,
    };


    DateChange = date => {
        console.log("date triggered")
        this.setState({AlbunmDate: date});
    };

    handleOnScrollTimeLine = (event) => {
        //this.startFadeOutAnimation();
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (this.offset || 0);
        if (Math.abs(dif) < 3) {
            console.log('unclear');
        } else if (dif < 0) {
            console.log('up');
            this.startFadeInAnimation()
        } else {
            console.log('down');
            this.startFadeOutAnimation()
        }
        this.offset = currentOffset;
    }

   /* handleOnScrollMomentumEnd = () => {
        console.log("triggered scroll end")
        this.startFadeInAnimation()
    }*/


    render() {
        const iconWidth = 30;
        const CircleOpacity = this.animatableValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        const gradientOpacity = this.animatableValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 0]
        });
        return (
            <View style={{flex: 1}}>
                <Animated.View style={{
                    opacity:gradientOpacity,
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: 50,
                    zIndex: 100}}>
                <LinearGradient
                    colors={["#BDBDBD", "#ffffff"]}
                    style={{
                        flex:1
                    }}
                />
                </Animated.View>
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
                        onScroll={this.handleOnScrollTimeLine}
                       // onScrollEnd={this.handleOnScrollMomentumEnd}
                    />
                </View>



                <CircleButton
                    bottom={10} right={10}  backgroundColor={"white"} options={false}
                    onPress={() => this.props.navigator.resetTo({
                        screen: "TimelineGallery",
                    })}>
                    {/*  <View style={{
                        height: 40,
                        width: 40,
                        borderRadius:40/2,
                        backgroundColor:"black",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <IonIcons name="ios-grid-outline" style={{fontSize: iconWidth, color: "white"}}/>
                    </View>*/}
                </CircleButton>
                <View style = {{position:"absolute",bottom:10,left:10}}>
                <PopoverTooltip
                    ref='NotifToggle'
                    buttonComponent={
                        <Animated.View
                            style={{
                                opacity: CircleOpacity,
                                zIndex: 200
                            }}
                        >
                        <MaterialIcons
                            name="dots-vertical"
                            style={{fontSize: 35, color: "black"}}
                            onPress={() => {
                               /* this.props.navigator.resetTo({
                                    screen: "TimelineGallery",
                                })*/
                                this.refs.NotifToggle.toggle()
                            }}
                        />
                        </Animated.View>
                    }
                    items={[
                        {
                            label: 'Profile',
                            onPress: () => {
                                console.log("triggered")
                                this.props.navigator.push({
                                    screen: "Profile"
                                })
                            }
                        },
                        {
                            label: 'Search',
                            onPress: () => {
                            }
                        }
                    ]}
                />
                </View>
               {/* <CircleButton options={true} bottom={10} left={10} opacity={CircleOpacity}>
                    <MaterialIcons
                        name="dots-vertical"
                        style={{fontSize: iconWidth, color: "black"}}
                        onPress={() => {
                            this.props.navigator.resetTo({
                                screen: "TimelineGallery",
                            })
                        }}
                    />
                     <View  style={{backgroundColor: "black"}}></View>
                </CircleButton>*/}
                {/*<CircleButton
                    opacity={CircleOpacity}
                    top={10} left={-10} borderTopRightRadius={25} borderBottomRightRadius={25} onPress={() => {
                    this.props.navigator.push({
                        screen: "NotificationActivity"
                    })
                    // this.refs.NotifToggle.toggle()
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
                </CircleButton>*/}
                {/*< CircleButton
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
                </CircleButton>*/}

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
                        }}>{moment(this.state.AlbunmDate).format('MM/DD/YYYY')}</Text>

                    </View>
                </View>
            </View>);
    }
}

