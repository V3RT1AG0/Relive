// @flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import TimelineReducer from "../Activities/TimelineActivity/TimelineReducer";

const reducers = combineReducers({ timeline: TimelineReducer });
const middlewares = applyMiddleware(thunk, logger);
export default () => createStore(reducers, middlewares);
//export default () => createStore(middlewares);
