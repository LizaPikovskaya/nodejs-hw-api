const { User } = require("../../models/user");
const HttpError = require("./../../helpers/HttpError");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    HttpError(404, "User not found");
  }
  //   user.verificationToken = null;
  //   user.verify = true;
  //   await user.save();

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
