//@flow
import React from "react";
import {Text, View,} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import TimeLineListView from "./TimeLineListView";
import {Fonts} from '../../Assets/Fonts'
import TimeLineRealm from "./TimeLineModel";
import {loadInitialTimelinefromRealm} from "./TimelineUtil";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {CircleButton} from "../Components/Modules/CircleButton";
import PopoverTooltip from 'react-native-popover-tooltip';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AlbunmDate: "26-01-2018",
            albums: TimeLineRealm.objects("Album")
                ? TimeLineRealm.objects("Album")
                : []
        }
    }

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

    static
    navigatorStyle = {
        navBarHidden: true
    };


    DateChange = date => {
        this.setState({AlbunmDate: date});
    };


    render() {
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
                    />
                </View>

                <CircleButton
                    bottom={10} right={20} onPress={() => this.props.navigator.resetTo({
                    screen: "TimelineGallery",
                })}>
                    <Icon name="stop" style={{fontSize: 30, color: "white"}}/>
                </CircleButton>
                <CircleButton bottom={10} left={20}>
                    <EvilIcons
                        name="search"
                        style={{fontSize: 30, color: "white"}}
                        onPress={() => {
                            this.props.navigator.resetTo({
                                screen: "TimelineGallery",
                            })
                        }}
                    />
                </CircleButton>
                <CircleButton
                    top={10} left={20} onPress={() => {this.refs.NotifToggle.toggle()}}
                >
                    <PopoverTooltip
                        ref='NotifToggle'
                        setBelow
                        buttonComponent={
                            <IonIcons name="ios-notifications" style={{fontSize: 30, color: "white"}}/>
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
                    top={10}
                    right={20}
                    onPress={() => {
                        this.props.navigator.push({
                            screen: "Profile"
                        })
                    }
                    }
                >
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
                <
                /View>
                )
                ;
                }
                }

