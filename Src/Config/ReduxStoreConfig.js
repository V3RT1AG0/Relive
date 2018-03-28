// @flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import TimelineReducer from "../Activities/TimelineActivity/TimelineReducer";
import GalleryReducer from "../Activities/GalleryActivity/GalleryReducer";
import UploadReducer from "../Activities/UploadActivity/UploadReducer";

const reducers = combineReducers({
	timeline: TimelineReducer,
	gallery: GalleryReducer,
	upload: UploadReducer
});
const middlewares = applyMiddleware(thunk, logger);
//export default () => createStore(reducers, middlewares);
//export default () => createStore(middlewares);
console.log("store created");
const store = createStore(reducers, middlewares);
export default store;
