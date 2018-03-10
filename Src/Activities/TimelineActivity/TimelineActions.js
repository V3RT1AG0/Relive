// @flow
import { loadInitialTimelinefromRealm } from "./TimelineUtil";

export const loadInitialTimeline = () => dispatch => {
	console.log("load initial timeline action called");
	dispatch(loadInitialTimelinefromRealm());
};
