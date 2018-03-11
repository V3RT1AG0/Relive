// @flow
import { connect } from "react-redux";
import { loadInitialPhotos } from "./GalleryActions";
import PhotosMain from "./GalleryMain";

const mapDispatchToProps = dispatch => ({
	getInitialPhotos: subAlbumId => dispatch(loadInitialPhotos(subAlbumId))
});

const mapStateToProps = state => ({ PhotosData: state.Photos });

const PhotosContainer = connect(mapStateToProps, mapDispatchToProps)(
	PhotosMain
);

export default PhotosContainer;
