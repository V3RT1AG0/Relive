import React, { Component } from "react";
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
import { ChatRealm } from './ChatModel';
import { sendMessageToServer } from './ChatUtils';

export default class ChatScreen extends Component {
constructor(props){
  super(props)
  this.state={
      messsages:ChatRealm.objectForPrimaryKey("ChatList", props.chatid).messsages
  }
}

componentDidMount = () => {
  ChatRealm.addListener("change", this.forceUpdateRealm);
};

componentWillUnmount = () => {
  ChatRealm.removeListener("change", this.forceUpdateRealm);
};

handleSendMessage = (text) => {
  sendMessageToServer(this.props.chatid,{text,author:this.state.userId})
}

forceUpdateRealm = () => {
  this.forceUpdate(() => {
    console.log("forceUpdate");
  });
};

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params.data,
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        height: 60
      },
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contact")}
            style={{
              borderColor: "black",
              marginRight: 25
            }}
          >
            <View>
              <Text>
                <Icon
                  name="ios-arrow-down"
                  style={{ color: "black", fontSize: 25 }}
                />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    };
  };

  

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={[
            { key: "1", uid: "me", msg: "Hi", author: "You" },
            {
              key: "2",
              uid: "you",
              msg: "Hiee",
              author: "Adityaraj"
            },
            {
              key: "3",
              uid: "me",
              msg:
                "How are you??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/",
              author: "You"
            },
            {
              key: "4",
              uid: "you",
              msg:
                "Goodddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
              author: "Siddesh"
            },
            {
              key: "5",
              uid: "you",
              msg: "And what about you?",
              author: "Adityaraj"
            },
            { key: "6", uid: "me", msg: "Awesomeeee...!!!", author: "You" },
            {
              key: "8",
              uid: "me",
              msg: "Blah Blah Blah..!!!!",
              author: "You"
            },
            {
              key: "9",
              uid: "you",
              msg: "Blah Blah Blah..!!!!",
              author: "Adityaraj"
            },
            {
              key: "10",
              uid: "me",
              msg: "Blah Blah Blah..!!!!",
              author: "You"
            },
            {
              key: "11",
              uid: "you",
              msg: "Blah Blah Blah..!!!!",
              author: "Adityaraj"
            },
            {
              key: "12",
              uid: "me",
              msg: "Blah Blah Blah..!!!!",
              author: "You"
            },
            {
              key: "13",
              uid: "you",
              author: "Adityaraj",
              img: "dd",
              caption: "This is a sweet caption"
            },
            {
              key: "14",
              uid: "me",
              msg: "Blah Blah Blah..!!!!",
              author: "You",
              img: "dd"
            },
            {
              key: "15",
              uid: "you",
              msg: "Blah Blah Blah..!!!!",
              author: "Adityaraj"
            }
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                alignItems: item.uid == "me" ? "flex-end" : "flex-start",
                marginBottom: 15
              }}
              key={item.id}
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
                      item.uid == "you" ? "flex-start" : "flex-end"
                  }}
                >
                  <Text
                    style={{
                      color: "#000", //randomize colour for author
                      fontSize: 17
                    }}
                  >
                    {item.uid == "you" ? item.author : ""}
                  </Text>

                  <Text
                    style={{
                      color: "#000",
                      fontSize: 10,
                      marginLeft: item.uid == "you" ? 10 : 0,
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
                        source={require("../Images/download.jpeg")}
                        style={{ marginTop: 10 }}
                      />
                      <Text style={{ marginTop: 10 }}>
                        <Icon2 name="quote" style={{ marginTop: -40 }} />{" "}
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
                      <View style={{ flex: 1, backgroundColor: "transparent" }}>
                        <FlatList
                          data={[{ key: "a" }, { key: "b" }, { key: "b" }]}
                          renderItem={({ item, index }) => (
                            <Image
                              source={require("../Images/download.jpeg")}
                              style={{
                                marginRight: index == 2 ? 0 : 1 // todo : get photos array length
                              }}
                            />
                          )}
                          horizontal={true}
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
                  <View style={{ maxWidth: 250 }}>
                    {/* Plain text message */}
                    <Text
                      style={{
                        color: "#212121",
                        marginTop: 10,
                        marginLeft: 22,
                        marginRight: 22
                      }}
                    >
                      {item.msg}
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
              style={{ fontSize: 30, color: "#000" }}
              onPress={() => alert("Smile")}
            />
          </View>
          <View style={{ flex: 6 }}>
            <TextInput multiline={true} />
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
              style={{ fontSize: 30 }}
              onPress={() => alert("Send")}
            />
          </View>
        </View>
      </View>
    );
  }
}
