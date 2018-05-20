//@flow
import React from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Dash from "react-native-dash";
import {Fonts} from "../../Assets/Fonts";

export default class TimeLineListView extends React.Component {
    constructor(props) {
        super(props);
        this.seperating_items = this.seperating_items.bind(this);
        this.viewabilityConfig = {itemVisiblePercentThreshold: 100};
        this.setting = this.setting.bind(this);
        this.data = [
            {
                key: "0",
                Heading: "Birthday",
                DisplayData: "Rocks",
                Photos: [],
                date: "16 Jan '17"
            },
            {
                key: "1",
                Heading: "Nightout with boiss",
                DisplayData: "Is Learning",
                Photos: [],
                date: "16 Jan '17"
            },
            {
                key: "2",
                Heading: "Jitesh",
                DisplayData: "Expert",
                Photos: [],
                date: "20 May '18"
            },
            {
                key: "3",
                Heading: "Blah",
                DisplayData: "Is Blah",
                Photos: [],
                date: "19 Aug '18"
            },
            {
                key: "4",
                Heading: "Blah",
                DisplayData: "Is Blah",
                Photos: [],
                date: "19 Aug '18"
            },
            {
                key: "5",
                Heading: "Blah",
                DisplayData: "Is Blah",
                Photos: [],
                date: "19 Aug '18"
            }
        ];
        this.state = {
            changed: this.data[0].date,
            data: this.data
        };
        this.dataLength = this.data.length - 1;
    }

    seperating_items = () => {
        return <View style={{margin: 40}}/>;
    };


    setting = viewable => {
        console.log(viewable, "viewable")
        if (viewable.viewableItems[0])
            this.props.DateChange(viewable.viewableItems[0].item.date);
    };

    header_dash_line = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 0.4
                }}
            >
                <Dash
                    style={{
                        width: 100,
                        height: 100,
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    dashThickness={1}
                    dashColor={"#546E7A"}
                />
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.data}
                    onViewableItemsChanged={this.setting}
                    //initialNumToRender={1}

                    viewabilityConfig={this.viewabilityConfig}
                    inverted={true} //  onScroll={this._onScroll}
                    ListHeaderComponent={
                        <View style={{backgroundColor: "#fff"}}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon name="md-add-circle" style={{fontSize: 60, color: "#546E7A"}}/>
                            </View>
                            <View style={{height: 200}}/>
                        </View>
                    }
                    renderItem={({item, index}) => (
                        <View
                            style={{
                                flex: 4,
                                flexDirection: "column",
                                backgroundColor: "#ffffff"
                                //	opacity: this.state.changed == item.date ? 1.0 : 0.4
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                    marginBottom: 20,
                                    opacity:
                                        this.props.CurrentlyDisplayedDate == item.date ? 1.0 : 0.4
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text style={style.textStyle}>{item.Heading}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        marginBottom: 20,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Fonts.RobotoSmall,
                                            fontSize: 18
                                        }}
                                    >
                                        With Kushal, Aditya & 10 more
                                    </Text>
                                    <Text style={{fontFamily: Fonts.RobotoSmall, fontSize: 15}}>
                                        {"  "}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row"
                                    }}
                                >
                                    <View style={style.imageWrap}>
                                        <Image
                                            style={style.imageStyle}
                                            source={require("../../Assets/Images/charmander.png")}
                                        />
                                    </View>
                                    <View style={style.imageWrap}>
                                        <Image
                                            style={style.imageStyle}
                                            source={require("../../Assets/Images/charmander.png")}
                                        />
                                    </View>
                                    <View style={style.imageWrap}>
                                        <Image
                                            style={style.imageStyle}
                                            source={require("../../Assets/Images/charmander.png")}
                                        />
                                    </View>
                                    <TouchableHighlight
                                        onPress={() => this.props.navigation.navigate("Album_add")}
                                    >
                                        <View
                                            style={
                                                {
                                                    width: 65,
                                                    height: 65,
                                                    backgroundColor: "grey",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    opacity: 0.5
                                                } // backgroundColor:'#ffffff',
                                            }
                                        >
                                            <Text>+10</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            {this.header_dash_line()}
                        </View>
                    )}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        marginBottom: 10,
        fontFamily: Fonts.RobotoSmall,
        color: "black",
        fontWeight: "200"
    },

    peopleStyle: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: Fonts.RobotoSmall,
        color: "black"
    },
    imageWrap: {
        width: 65,
        height: 65,
        marginRight: 1
    },
    imageStyle: {
        width: "100%",
        height: "100%"
    }
});
