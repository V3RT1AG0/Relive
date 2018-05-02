// @flow

import axios from "axios";
import socket from "../Config/SocketConfig";
import { MY_ID } from "../Config/Constants";

export const changeStatusToOnline = () => {
	socket.emit("goOnline", MY_ID);
};

export const changeStatusToOffline = () => {
	socket.emit("goOffline", MY_ID);
};
