// @flow
import { UPLOAD_PROGRESS } from "../../Config/Constants";

const GalleryReducer = (state = { progress: 0 }, action) => {
	switch (action.type) {
		case UPLOAD_PROGRESS:
			return (state = { progress: action.progress });
		default:
			return state;
	}
};

export default GalleryReducer;
