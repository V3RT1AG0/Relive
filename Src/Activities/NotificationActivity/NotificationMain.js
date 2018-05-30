// @flow
import React, {Component} from "react";
import {View} from "react-native";
import {connect} from "react-redux";

class NotificationMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "5aa82ea7bfad0122a3757be2"
        };
    }

    componentDidMount() {

    }

    render() {
        return <View style={{backgroundColor: "white", flex: 1}}/>;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMain);
