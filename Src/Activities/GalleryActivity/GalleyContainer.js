// @flow
import { connect } from "react-redux";
import { loadInitialPhotos } from "./GalleryActions";
import PhotosMain from "./GalleryMain";

const mapDispatchToProps = dispatch => ({
	getInitialPhotos: AlbumId => dispatch(loadInitialPhotos(AlbumId))
});

const mapStateToProps = state => ({ PhotosData: state.gallery });

const PhotosContainer = connect(mapStateToProps, mapDispatchToProps)(
	PhotosMain
);

export default PhotosContainer;
