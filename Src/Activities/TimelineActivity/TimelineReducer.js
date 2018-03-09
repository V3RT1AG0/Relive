// @flow
import { INITIAL_TIMELINE } from "../../Config/Constants";

const TimelineReducer = (state = [], action) => {
	switch (action.type) {
		case INITIAL_TIMELINE:
			return (state = [...action.data]);
		default:
			return state;
	}
};

export default TimelineReducer;
