// @flow
import React, { Component } from "react";
import { Text, View, Switch, CheckBox, FlatList } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export default class AlbumOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 22
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        paddingBottom: 12,
                        borderColor: "#eeeeee",
                        borderBottomWidth: 1,
                        marginBottom: 10
                    }}
                >
                    Album Options
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                >
                    <Text style={{ flex: 1, fontSize: 19, fontWeight: "500" }}>
                        Hide Album
                    </Text>
                    <Switch style={{ alignSelf: "flex-end" }} />
                </View>

                <Text style={{ fontSize: 19, marginBottom: 10, fontWeight: "500" }}>
                    Allow others to
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10
                        }}
                    >
                        <Text style={{ flex: 1, fontSize: 18 }}>Add photos</Text>
                        <CheckBox style={{ alignSelf: "flex-end" }} />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ flex: 1, fontSize: 18 }}>Add people</Text>
                        <CheckBox style={{ alignSelf: "flex-end" }} />
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        paddingBottom: 12,
                        borderColor: "#eeeeee",
                        borderBottomWidth: 1,
                        marginBottom: 10,
                        marginTop: 22
                    }}
                >
                    In Album{" "}
                </Text>

                <FlatList
                    data={[{ name: "Kushal Siddesh" }, { name: "Adityaraj" }]}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                flex: 1,
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ flex:1,fontSize: 20, marginBottom: 10 }}>
                                {item.name}
                            </Text>
                            <Entypo name="cross" size={22} color="#999" />
                        </View>
                    )}
                />
            </View>
        );
    }
}
