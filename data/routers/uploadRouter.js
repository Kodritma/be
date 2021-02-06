const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const slugify = require("../../utils/slugify");

const makeFileName = (str) => {
  const filename = slugify(str.substr(0, str.lastIndexOf(".")));
  const extension = str.substr(str.lastIndexOf("."), str.length);
  return Date.now() + "_" + filename + extension;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, makeFileName(file.originalname)),
});

const upload = multer({ storage }).single("file");

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    return res.status(200).send(req.file.filename);
  });
});

router.delete("/:filename", (req, res, next) => {
  const { filename } = req.params;
  const path = "public/uploads/" + filename;
  try {
    fs.unlinkSync(path);
    return res.status(204).end();
  } catch {
    next({ statusCode: 501, errorMeesage: "Error deleting file" });
  }
});

module.exports = router;
