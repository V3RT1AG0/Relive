// @flow
import { INITIAL_TIMELINE } from "../../Config/Constants";

const TimelineReducer = (state = [], action) => {
	switch (action.type) {
		case INITIAL_TIMELINE:
			//TODO right now the whole state obtained from realm is loaded and not just the updated part
			//Option 1: append the result obtained from server i.e ...server.data once inserted into realm
			// 2: use redux thunk getState method
			return (state = [...action.data]);
		default:
			return state;
	}
};

export default TimelineReducer;
