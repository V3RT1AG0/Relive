//@flow
import React from "react";
import {Text, View,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeLineListView from "./TimeLineListView";
import {Fonts} from '../../Assets/Fonts'
import TimeLineRealm from "./TimeLineModel";
import {loadInitialTimelinefromRealm} from "./TimelineUtil";


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
            console.log("forceUpdateTimeline",this.state.albums);
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
                <View
                    style={{position: "absolute", bottom: 10, right: 20, zIndex: 200}}
                >
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginRight: 20}}>
                        <Icon name="stop-circle" style={{fontSize: 60}}
                              onPress={() => this.props.navigator.resetTo({
                                  screen: "TimelineGallery",
                                  title: "TimelineGallery"
                              })}/>
                    </View>
                </View>
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
            </View>
        );
    }
}

