const router = require("express").Router();
const slugify = require("../../utils/slugify");

const Video = require("../models/video");

router.get("/", (req, res, next) => {
  Video.find()
    .then((videos) => res.status(200).json(videos))
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error fetching latest videos" });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Video.findById(id)
    .then((video) => {
      res.status(200).json(video);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error fetching video details" });
    });
});

router.post("/", (req, res, next) => {
  const video = req.body;

  if (
    !video.url ||
    !video.title ||
    !video.description ||
    !video.playlistID ||
    !video.playlist_order
  ) {
    next({
      statusCode: 400,
      errorMessage: "Please provide all the required fields",
    });
  }

  video.slug = slugify(video.title);

  Video.add(video)
    .then((video) => {
      res.status(201).json(video);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error addding video" });
    });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedVideo = req.body;

  if (
    !updatedVideo.url ||
    !updatedVideo.title ||
    !updatedVideo.description ||
    !updatedVideo.playlistID ||
    !updatedVideo.playlist_order
  ) {
    next({
      statusCode: 400,
      errorMessage: "Please provide all the required fields",
    });
  }

  updatedVideo.slug = slugify(updatedVideo.title);

  Video.update(updatedVideo, id)
    .then((updatedVideo) => {
      res.status(200).json(updatedVideo);
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error updating video" });
    });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Video.remove(id)
    .then((_) => {
      res.status(204).end();
    })
    .catch((_) => {
      next({ statusCode: 500, errorMessage: "Error deleting video" });
    });
});

module.exports = router;
