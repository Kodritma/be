const db = require("../dbConfig.js");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find(limit = 10, offset = 0) {
  return db("Video")
    .leftJoin("Playlist", "Video.playlistID", "Playlist.ID")
    .select("Video.*", "Playlist.name as playlist_name")
    .limit(limit)
    .offset(offset);
}

function findById(ID) {
  return db("Video").where({ ID }).first();
}

function add(video) {
  video.ID = uuidv4();

  return db("Video")
    .insert(video, "Video.ID")
    .then(([ID]) => {
      return db("Video")
        .leftJoin("Playlist", "Video.playlistID", "Playlist.ID")
        .select("Video.*", "Playlist.name as playlist_name")
        .where("Video.ID", ID)
        .first();
    });
}

function update(video, ID) {
  return db("Video")
    .update(video)
    .where({ ID })
    .then((updated) => {
      if (updated === 1) return db("Video").where({ ID }).first();
      else throw new Error();
    });
}

function remove(ID) {
  return db("Video").del().where({ ID });
}
