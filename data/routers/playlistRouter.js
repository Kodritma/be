const router = require("express").Router();
const slugify = require("../../utils/slugify");

const Playlist = require("../models/playlist");

router.get("/", (req, res, next) => {
  Playlist.find()
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error fetching playlists" });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Playlist.findVideos(id)
    .then((playlist) => {
      res.status(200).json(playlist);
    })
    .catch((_) => {
      next({
        statusCode: 500,
        errorMessage: "Error fetching playlist details",
      });
    });
});

router.post("/", async (req, res, next) => {
  const playlist = req.body;
  console.log({ playlist });

  if (!playlist.name) {
    return next({
      statusCode: 400,
      errorMessage: "Please provide a playlist name",
    });
  }

  if (!playlist.slug) {
    playlist.slug = slugify(playlist.name);

    try {
      const ifExists = await Playlist.findBySlug(playlist.slug);
      if (ifExists) {
        return next({
          statusCode: 409,
          errorMessage: "This playlist name is in use",
        });
      }
    } catch {
      return next({
        statusCode: 500,
        errorMessage: "Error adding playlist",
      });
    }
  }

  Playlist.add(playlist)
    .then((playlist) => {
      res.status(201).json(playlist);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error adding playlist" });
    });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedPlaylist = req.body;
  console.log({ id, updatedPlaylist });

  if (!updatedPlaylist.name) {
    return next({
      statusCode: 400,
      errorMessage: "Playlist name cannot be empty",
    });
  }

  updatedPlaylist.slug = slugify(updatedPlaylist.name);

  try {
    const ifExists = await Playlist.findBySlug(updatedPlaylist.slug);
    console.log({ ifExists });
    if (ifExists && ifExists.name !== updatedPlaylist.name) {
      return next({
        statusCode: 400,
        errorMessage: "This playlist name is in use",
      });
    }
  } catch {
    return next({
      statusCode: 500,
      errorMessage: "Error updating playlist",
    });
  }

  Playlist.update(updatedPlaylist, id)
    .then((updatedPlaylist) => {
      res.status(200).json(updatedPlaylist);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error updating playlist" });
    });
});

router.put("/archive/:id", async (req, res, next) => {
  const { id } = req.params;
  const { bool } = req.body;

  try {
    const archiveChanged = await Playlist.archive(bool, id);
    res.status(200).json(archiveChanged);
  } catch {
    next({
      statusCode: 500,
      errorMessage: "Error archiving/unarchiving playlist",
    });
  }
});

module.exports = router;
