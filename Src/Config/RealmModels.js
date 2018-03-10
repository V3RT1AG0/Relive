// @flow
export const SubAlbumSchema = {
	name: "SubAlbum",
	properties: {
		userId: "string[]",
		groupTagId: "string[]"
	}
};

export const AlbumSchema = {
	name: "AlbumSchema",
	properties: {
		name: "string"
	}
};

export const TimeLineSchema = {
	name: "TimeLineSchema",
	properties: {
		subAlbumIds: "SubAlbum[]",
		albumId: "AlbumSchema",
		_id: "string"
	}
};
