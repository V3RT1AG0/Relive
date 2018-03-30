// @flow
import { connect } from "react-redux";
import { startUploadingPhotos } from "./UploadActions";
import UploadMain from "./UploadMain";

const mapDispatchToProps = dispatch => ({
	startUploadingPhotos: (payload, photosArray, navigator) =>
		dispatch(startUploadingPhotos(payload, photosArray, navigator))
});

const mapStateToProps = state => ({
	data: state.upload
});

const UploadContainer = connect(mapStateToProps, mapDispatchToProps)(
	UploadMain
);

export default UploadContainer;
