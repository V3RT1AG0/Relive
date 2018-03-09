// @flow
import { INITIAL_TIMELINE } from "../../Config/Constants";

export const loadInitialTimelineAC = data => ({
	type: INITIAL_TIMELINE,
	data
});
