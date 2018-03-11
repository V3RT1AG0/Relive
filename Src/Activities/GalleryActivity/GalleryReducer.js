// @flow
import { INITIAL_PHOTOS, ADD_PHOTOS } from "../../Config/Constants";

const GalleryReducer = (state = [], action) => {
	switch (action.type) {
		case INITIAL_PHOTOS:
			return (state = [...action.data]);
		case ADD_PHOTOS:
			return (state = [...state, ...action.data]);
		default:
			return state;
	}
};

export default GalleryReducer;
