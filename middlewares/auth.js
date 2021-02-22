const { default: axios } = require("axios");
const User = require("../data/models/user");

module.exports = async (req, res, next) => {
  const refresh_token = req.cookies["token"];

  try {
    const {
      data: { access_token },
    } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.G_CLIENT_ID,
        client_secret: process.env.G_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token,
      },
    });

    const { data: googleUser } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userExists = await User.findByEmail(googleUser.email);

    req.user = userExists;
    req.user.picture = googleUser.picture;
    req.user.isLoggedIn = true;
    if (!req.user.is_admin) delete req.user.is_admin;

    next();
  } catch {
    next({
      statusCode: 401,
      errorMessage: "User is not authenticated.",
    });
  }
};
