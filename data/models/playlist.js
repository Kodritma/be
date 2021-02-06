const db = require("../dbConfig.js");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  find,
  findBySlug,
  findVideos,
  add,
  update,
};

function find(limit = 10, offset = 0) {
  return db("Playlist").limit(limit).offset(offset);
}

function findBySlug(slug) {
  return db("Playlist").where({ slug }).first();
}

function findVideos(playlistID) {
  return db("Video").where("playlistID", playlistID);
}

function add(playlist) {
  playlist.ID = uuidv4();

  return db("Playlist")
    .insert(playlist, "ID")
    .then(([ID]) => {
      return db("Playlist").where({ ID }).first();
    });
}

function update(playlist, ID) {
  return db("Playlist")
    .update(playlist)
    .where({ ID })
    .then((updated) => {
      if (updated === 1) return db("Playlist").where({ ID }).first();
      else throw new Error();
    });
}
