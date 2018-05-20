// @flow
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    SectionList
} from "react-native";

import Other from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";
import {Fonts} from "../../Assets/Fonts";

const {width} = Dimensions.get("window");

export default class TimeLineGallery extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        setTimeout(() => {
            console.log(this._scrollView)
            this._scrollView.scrollToLocation({sectionIndex: 1,itemIndex:0, animated: false}); //viewOffset
        }, 10)

    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignContent: "flex-start",
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    padding: 5
                }}
            >
                <View style={{flex: 4}}>
                    <SectionList
                        stickySectionHeadersEnabled
                        style={styles.scrollContainer}
                        ref={(c) => {
                            this._scrollView = c
                        }}
                        renderItem={({item, index, section}) => {
                            const numColumns = 3;

                            if (index % numColumns !== 0) return null;

                            const items = [];

                            for (let i = index; i < index + numColumns; i++) {
                                if (i >= section.data.length) {
                                    break;
                                }

                                items.push(
                                    <Image
                                        resizeMode="cover"
                                        resizeMethod="resize"
                                        style={styles.box}
                                        source={section.data[i].img}
                                    />
                                );
                            }
                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    {items}
                                </View>
                            );
                        }}
                        renderSectionHeader={({section: {title}}) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    backgroundColor: "white"
                                }}
                            >
                                <View style={{flex: 1}}>
                                    <Text style={styles.textStyle}>header</Text>
                                    <Text style={styles.peopleStyle}>20th Mar 2018</Text>
                                </View>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <IonIcons
                                        style={{
                                            marginTop: 10,
                                            width: 25,
                                            height: 25,
                                            overflow: "hidden",
                                            color: "black",
                                            borderRadius: 25 / 2
                                        }}
                                        name="ios-arrow-down"
                                        size={25}
                                    />
                                </View>
                            </View>
                        )}
                        sections={[
                            {
                                title: "Title1",
                                data: [
                                    {key: "1", img: require("../../Assets/Images/charmander.png")},
                                    {key: "2", img: require("../../Assets/Images/charmander.png")},
                                    {key: "3", img: require("../../Assets/Images/charmander.png")},
                                    {key: "4", img: require("../../Assets/Images/charmander.png")}
                                ]
                            },
                            {
                                title: "Title2",
                                data: [
                                    {key: "5", img: require("../../Assets/Images/charmander.png")},
                                    {key: "6", img: require("../../Assets/Images/charmander.png")},
                                    {key: "7", img: require("../../Assets/Images/charmander.png")},
                                    {key: "8", img: require("../../Assets/Images/charmander.png")},
                                    {key: "9", img: require("../../Assets/Images/charmander.png")}
                                ]
                            },
                            {
                                title: "Title3",
                                data: [
                                    {key: "10", img: require("../../Assets/Images/charmander.png")},
                                    {key: "11", img: require("../../Assets/Images/charmander.png")},
                                    {key: "12", img: require("../../Assets/Images/charmander.png")},
                                    {key: "13", img: require("../../Assets/Images/charmander.png")},
                                    {key: "14", img: require("../../Assets/Images/charmander.png")}
                                ]
                            }
                        ]}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: 5,
                        position: "absolute",
                        zIndex: 100,
                        bottom: 35,
                        right: 10
                    }}
                >
                    <Other
                        name="stop-circle"
                        style={{fontSize: 60}}
                        onPress={() => this.props.navigator.resetTo({
                            screen: "Timeline",
                            title: "Timeline"
                        })}

                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },

    box: {
        height: width / 3,
        width: width / 3
    },
    textStyle: {
        fontSize: 30,
        position: "relative",
        marginTop: 5,
        fontFamily: Fonts.RobotoLarge,
        color: "black"
    },

    peopleStyle: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 15,
        position: "relative",
        fontFamily: Fonts.RobotoSmall,
        color: "black"
    },

    square_circle: {
        flexDirection: "row",
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 320,
        marginBottom: 40,
        marginTop: 570
    },

    square: {
        width: 25,
        height: 25,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 22,
        marginTop: 21
    }
});

