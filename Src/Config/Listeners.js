// @flow
import UploadRealm from "../Activities/UploadActivity/UploadModel";
import { insertAlbum } from "../Activities/UploadActivity/UploadUtils";
import store from "./ReduxStoreConfig";

//TODO ? maybe real.removealllisteners in App state event listener
export const setUpNewUploadRealmListener = () => {
	const Album = UploadRealm.objects("Album");
	console.log("LISTENER SETUP");
	Album.addListener((albums, changes) => {
		const AlbumsArray = [];
		changes.insertions.forEach(index => {
			AlbumsArray.push(albums[index]);
		});
		if (AlbumsArray.length !== 0) {
			AlbumsArray.forEach(album => {
				store.dispatch(insertAlbum(album));
			});
		}
	});
};
