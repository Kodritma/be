const { default: axios } = require("axios");
const User = require("../data/models/user");

module.exports = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.G_CLIENT_ID,
        client_secret: process.env.G_CLIENT_SECRET,
        redirect_uri: `${process.env.FRONTEND}/authenticate`,
        grant_type: "authorization_code",
        code,
        access_type: "offline",
      },
    });

    const { access_token, refresh_token } = data;

    const { data: googleUser } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { given_name, family_name, email, picture } = googleUser;

    const userExists = await User.findByEmail(googleUser.email);

    if (userExists) {
      req.user = userExists;
    } else {
      const display_name =
        given_name && family_name
          ? given_name + " " + family_name
          : given_name
          ? given_name
          : email;

      const admins = [
        "sametmutevellioglu@gmail.com",
        "aydinsenih@gmail.com",
        "bthn.balta@gmail.com",
      ];

      const newUser = {
        display_name,
        last_name: family_name || "",
        first_name: given_name || "",
        email,
        is_admin: admins.includes(email),
      };

      const addedUser = await User.add(newUser);

      req.user = addedUser;
    }
    req.user.picture = picture;

    if (!req.user.is_admin) delete req.user.is_admin;

    const prod = process.env.DB_ENV === "production";

    res.cookie("token", refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 365, // a year
      httpOnly: prod,
      secure: prod,
      domain: prod ? "kodritma.com" : "",
      sameSite: prod,
    });

    req.user.isLoggedIn = true;
    next();
  } catch {
    next({ statusCode: 501, errorMessage: "Error while logging in" });
  }
};
