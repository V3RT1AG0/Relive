// @flow
import SocketIOClient from "socket.io-client";
import { SERVER_URL } from "./Constants";

export default SocketIOClient(SERVER_URL);
