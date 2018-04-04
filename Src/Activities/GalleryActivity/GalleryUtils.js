// @flow
import { SERVER_URL, INITIAL_PHOTOS, ADD_PHOTOS } from "../../Config/Constants";
import socket from "../../Config/SocketConfig";
import axios from "axios";
import { GalleryRealm } from "./GalleryModels";

const loadPhotosAC = data => ({
	type: INITIAL_PHOTOS,
	data
});

const addNewPhotosAC = data => ({
	type: ADD_PHOTOS,
	data
});

const addSinglePhoto = photo => ({
	type: ADD_PHOTOS,
	photo
});

/* export const loadInitialPhotosfromRealm = AlbumId => {
	const Photos = realm.objects("Photos");
	let latestPhotoId = "000000000000000000000000";
	console.log(Photos.length);
	if (Photos.length !== 0) latestPhotoId = Photos.sorted("_id", true)[0]._id;
	//TODO maybe the listner needs to be removed(realm.removelistener) when closing the activity
	/* realm.addListener("change", () => {
		console.log("data changed" + Photos);
		dispatch(loadPhotosAC(Photos));
	}); */
/* Photos.addListener((Photos, changes) => {
		console.log(changes + "changes");
		const PhotosArray = [];
		changes.insertions.forEach(index => {
			console.log(Photos[index]);
			PhotosArray.push(Photos[index]);
		});
		if (PhotosArray.length !== 0) dispatch(addNewPhotosAC(PhotosArray));
	});

	dispatch(loadPhotosAC(Photos));
	fetchNewPhotosDataFromNetwork(AlbumId, latestPhotoId); 
}; */

export const fetchNewPhotosDataFromNetwork = (AlbumId, photos) => {
	//in production this will only fetch updated data
	let latestPhotoId = "000000000000000000000000";
	if (photos.length !== 0) latestPhotoId = photos.sorted("_id", true)[0]._id;
	console.log("latestPhoto ID=>", latestPhotoId);
	return axios
		.get(SERVER_URL + "/album/getAlbumPhotos/" + AlbumId + "/" + latestPhotoId)
		.then(result => {
			console.log("fetchfromnetwork", result);
			return addNewPhotoToRealm(result.data);
		})
		.catch(error => console.log(error.response));
};

const addNewPhotoToRealm = album =>
	new Promise((resolve, reject) => {
		const newPhotos = album.photoId;
		const Album = GalleryRealm.objectForPrimaryKey("Album", album._id);
		if (Album)
			try {
				console.log("Tiggered 1st condition");
				GalleryRealm.write(() => {
					newPhotos.forEach(photo => {
						Album.photos.push(photo);
					});
				});
				resolve("success");
			} catch (e) {
				console.log(e);
				reject(e);
			}
		else {
			try {
				console.log("Tiggered 2nd condition");
				GalleryRealm.write(() => {
					GalleryRealm.create("Album", {
						_id: album._id,
						owner: album.owner,
						userId: album.userId,
						groupTagId: album.groupTagId,
						photos: album.photoId
					});
				});
				resolve("success");
			} catch (e) {
				console.log(e);
				reject(e);
			}

			//change photoId to photos to avoid name conflict and then set using simply {_id,owner,...}
		}
	});

export const setUpSocketforImageUpdates = AlbumId => {
	const Album = GalleryRealm.objectForPrimaryKey("Album", AlbumId);
	socket.emit("enterAlbum", AlbumId);
	socket.on("Photo", photo => {
		console.log("PhotoFromSocket", photo);
		try {
			GalleryRealm.write(() => {
				Album.photos.push(photo);
			});
		} catch (e) {
			console.log("Error on creation", e);
		}
	});
};

//TODO
export const leaveSocketRoom = AlbumId => {
	const Album = GalleryRealm.objectForPrimaryKey("Album", AlbumId);
	socket.emit("enterAlbum", AlbumId);
	socket.on("Photo", photo => {
		console.log("PhotoFromSocket", photo);
		try {
			GalleryRealm.write(() => {
				Album.photos.push(photo);
			});
		} catch (e) {
			console.log("Error on creation", e);
		}
	});
};
