// @flow
import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import {ChatRealm} from "./ChatModel";
import {sendMessageToServer, fetchNewChatsFromNetwork} from "./ChatUtils";

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.chatId = props.data; //from props using navigation to pass chat id
        this.userid = "5aa82ea7bfad0122a3757be2"; //from constants
        this.state = {
            message: "",
            messages: ChatRealm.objectForPrimaryKey("ChatList", this.chatId).messages
        };
    }

    componentDidMount = () => {
        ChatRealm.addListener("change", this.forceUpdateRealm);

        fetchNewChatsFromNetwork(this.chatId, this.userid, this.state.chatList)
            .then(() => {
                const messages = ChatRealm.objectForPrimaryKey("ChatList", this.chatId)
                    .messages;
                this.setState({messages}, () => {
                    console.log("setStateTriggered=>", this.state.messages);
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    componentWillUnmount = () => {
        ChatRealm.removeListener("change", this.forceUpdateRealm);
    };

    handleSendMessage = () => {
        sendMessageToServer(this.chatId, {
            text: this.state.message,
            author: this.userid
        })
            .then(() => console.log("sucess"))
            .catch(e => console.log(e.response));
    };

    handleChangeText = message => {
        this.setState({message});
    };

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("forceUpdate");
        });
    };

    static navigatorButtons = {

        rightButtons: [
            {
                id: "drop",
                title: "drop",
                component: "DropDownArrow",
            }
        ]
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item}) => (
                        <View
                            style={{
                                flex: 1,
                                alignItems: item.author._id === this.userid ? "flex-end" : "flex-start",
                                marginBottom: 15
                            }}
                            key={item.key}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    marginTop: 10,
                                    marginBottom: 8
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginLeft: 22,
                                        marginRight: 22,
                                        justifyContent:
                                            item.author._id === this.userid ? "flex-end" : "flex-start"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#000", //randomize colour for author
                                            fontSize: 17
                                        }}
                                    >
                                        {item.author._id === this.userid ? "" : item.author.name}
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#000",
                                            fontSize: 10,
                                            marginLeft: item.author._id === this.userid ? 0 : 10,
                                            textAlign: "right"
                                        }}
                                    >
                                        02.19 pm
                                    </Text>
                                </View>

                                {(item.img &&
                                    (item.caption ? (
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "column",
                                                marginLeft: 22,
                                                marginRight: 22
                                            }}
                                        >
                                            <Image
                                                source={require("../../Assets/Images/download.jpeg")}
                                                style={{marginTop: 10}}
                                            />
                                            <Text style={{marginTop: 10}}>
                                                <Icon2 name="quote" style={{marginTop: -40}}/>{" "}
                                                {item.caption}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View
                                            style={{
                                                flex: 1,
                                                marginTop: 10,
                                                flexDirection: "column"
                                            }}
                                        >
                                            <View style={{flex: 1, backgroundColor: "transparent"}}>
                                                <FlatList
                                                    data={[{key: "a"}, {key: "b"}, {key: "b"}]}
                                                    renderItem={({item, index}) => (
                                                        <Image
                                                            source={require("../../Assets/Images/download.jpeg")}
                                                            style={{
                                                                marginRight: index == 2 ? 0 : 1 // todo : get photos array length
                                                            }}
                                                        />
                                                    )}
                                                    horizontal
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    padding: 10,
                                                    borderBottomLeftRadius: 6,
                                                    borderBottomRightRadius: 6,
                                                    backgroundColor: "#eceff1"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignItems: "center",
                                                        borderRightWidth: 1,
                                                        borderRightColor: "#ccc"
                                                    }}
                                                >
                                                    <Text>Add to Album</Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Text>Create Album</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))) || (
                                    <View style={{maxWidth: 250}}>
                                        {/* Plain text message */}
                                        <Text
                                            style={{
                                                color: "#212121",
                                                marginTop: 10,
                                                marginLeft: 22,
                                                marginRight: 22
                                            }}
                                        >
                                            {item.text}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />

                {/* Bottom  bar */}
                <View
                    style={{
                        height: 50,
                        flexDirection: "row",
                        paddingTop: 5
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <Icon
                            name="md-photos"
                            style={{fontSize: 30, color: "#000"}}
                            onPress={() => alert("Smile")}
                        />
                    </View>
                    <View style={{flex: 6}}>
                        <TextInput multiline onChangeText={this.handleChangeText}/>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            marginRight: 5,
                            justifyContent: "center"
                        }}
                    >
                        <Icon
                            name="md-send"
                            style={{fontSize: 30}}
                            onPress={this.handleSendMessage}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
