const router = require("express").Router();

const auth = require("../../middlewares/auth");
const User = require("../models/user");

router.post("/check-slug", auth, async (req, res, next) => {
  const { newSlug } = req.body;

  try {
    const slugExists = await User.findBySlug(newSlug);
    if (slugExists) {
      next({
        statusCode: 409,
        errorMessage: "This slug is used by another user.",
      });
    } else {
      res.status(200).end();
    }
  } catch {
    next({ statusCode: 501, errorMessage: "Error checking slug" });
  }
});

router.post("/update-profile", auth, async (req, res, next) => {
  const { display_name, first_name, last_name, slug } = req.body;
  const updatedUserData = { display_name, first_name, last_name, slug };

  try {
    const userUpdated = await User.update(updatedUserData, req.user.ID);
    res.status(200).json(userUpdated);
  } catch {
    next({ statusCode: 500, errorMessage: "Error updating user data" });
  }
});

module.exports = router;
