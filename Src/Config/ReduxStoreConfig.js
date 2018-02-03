// @flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
//import TodoReducer from "../Components/Todo/TodoReducer";

//const reducers = combineReducers({ todo: TodoReducer });
const middlewares = applyMiddleware(thunk, logger);
//export default () => createStore(reducers, middlewares);
export default () => createStore(middlewares);
