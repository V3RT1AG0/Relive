// @flow
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    TouchableNativeFeedback
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import {ChatRealm} from "../ChatMainActivity/ChatModel";
import {fetchNewChatListFromNetwork} from "./ChatHomeUtils";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "5aa82eafbfad0122a3757be3",  //SwitchThisWithMY_ID in constants
            chatList: ChatRealm.objects("ChatList")
        };
    }


    navigationOptions = () => (
        <View style={{
            elevation: 0,
            height: 60,
            flexDirection:"row",
            alignItems:"center"
        }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Icon
                        name="ios-arrow-round-back"
                        style={{fontSize: 36, marginLeft: 18, marginTop: 4}}
                    />

                    <TextInput
                        style={{marginLeft: 15, width: 270}}
                        value="Search people"
                    />
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
                <View style={{alignItems: "center", marginRight: 10}}>
                    <Text>
                        <Icon name="ios-add-outline" style={{fontSize: 35}}/>
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("StateChanged=>", this.state.chatList);
        });
    };

    componentDidMount = () => {
        ChatRealm.addListener("change", this.forceUpdateRealm);

        fetchNewChatListFromNetwork(this.state.userId, this.state.chatList)
            .then(() => {
                console.log();
                //set up socket to listen to updates
                //setUpSocketforNewConversation(this.state.AlbumId);
                //TODO: Pull to update chatlist or realtime using sockets?
                // pass realm photos to setState in case it was empty array initially
                const chatList = ChatRealm.objects("ChatList");
                this.setState({chatList}, () => {
                    console.log("setStateTriggered=>", this.state.chatList);
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    componentWillUnmount = () => {
        ChatRealm.removeListener("change", this.forceUpdateRealm);
    };
    static navigatorStyle = {
        navBarHidden: true
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white"
                }}
            >
                {this.navigationOptions()}
                <FlatList
                    data={this.state.chatList}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) => (
                        <TouchableNativeFeedback
                            onPress={
                                () =>
                                    this.props.navigator.push({
                                        screen: "Chat",
                                        passProps: {data: item._id}
                                    })
                                //this.props.navigation.navigate("Chat", { data: item.key })
                            }
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    padding: 12,
                                    opacity: item.unread ? 1 : 0.6
                                }}
                            >
                                <View style={style.imageView}>
                                    <Image
                                        source={require("../../Assets/Images/download.jpeg")}
                                        style={style.image}
                                    />
                                </View>
                                <View style={style.textView}>
                                    <View style={{flex: 1, flexDirection: "row"}}>
                                        <View style={{flex: 1, alignItems: "flex-start"}}>
                                            <Text style={style.text}>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "flex-end",
                                                marginTop: 4,
                                                marginRight: 10
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: item.unread ? "400" : "normal",
                                                    color: "#000"
                                                }}
                                            >
                                                yestetday
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        <View style={{flex: 1, marginTop: -20}}>
                                            <Text
                                                style={{
                                                    color: "#000",
                                                    fontWeight: item.unread ? "500" : "normal"
                                                }}
                                            >
                                                hello
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: -20,
                                                flex: 1,
                                                alignItems: "flex-end",
                                                marginRight: 10
                                            }}
                                        >
                                            <Text style={style.textUnread}>{item.count}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: "row"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    imageView: {
        marginRight: 18
    },
    textView: {
        flex: 1
    },
    textUnread: {
        backgroundColor: "black",
        color: "white",
        borderRadius: 50,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 10
    },
    text: {
        fontSize: 18,
        color: "black",
        fontWeight: "400",
        marginTop: 4
    }
});
