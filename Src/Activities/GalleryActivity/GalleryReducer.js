// @flow
import { INITIAL_PHOTOS } from "../../Config/Constants";

const GalleryReducer = (state = [], action) => {
	switch (action.type) {
		case INITIAL_PHOTOS:
			return (state = [...action.data]);
		default:
			return state;
	}
};

export default GalleryReducer;
