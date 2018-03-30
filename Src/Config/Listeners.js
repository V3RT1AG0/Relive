// @flow
import UploadRealm from "../Activities/UploadActivity/UploadModel";
import { insertAlbum } from "../Activities/UploadActivity/UploadUtils";
import store from "./ReduxStoreConfig";

//TODO ? maybe real.removealllisteners in App state event listener
export const setUpNewUploadRealmListener = () => {
	const Album = UploadRealm.objects("Album");
	console.log("LISTENER SETUP");
	Album.addListener((albums, changes) => {
		console.log(changes);
		const AlbumsArray = [];
		changes.insertions.forEach(index => {
			AlbumsArray.push(albums[index]);
		});

		/* changes.modifications.forEach(index => {
			console.log("mods")
			AlbumsArray.push(albums[index]);
		}); */

		if (AlbumsArray.length !== 0) {
			AlbumsArray.forEach(album => {
				/*  console.log({
					...album,
					photos: album.photos.map(x => Object.assign({}, x))
				});  */
				 const newAlbum = {
					...album,
					photos: album.photos.map(x => Object.assign({}, x))
				}; 
				//console.log(album.snapshot());
				store.dispatch(insertAlbum(newAlbum));
			});
		}
	});
};
