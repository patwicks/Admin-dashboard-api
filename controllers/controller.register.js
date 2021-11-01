const Admin = require("../models/model.register");
const bcrypt = require("bcryptjs");
const REGISTER_NEW_ADMIN = async (req, res) => {
  const checkEmailExist = await Admin.findOne({ email: req.body.email });
  if (checkEmailExist)
    return res.status(400).json({ error: "Email already in used!" });

  // Hasing password using Bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
  });
  try {
    const saveNewAdmin = await admin.save();
    if (saveNewAdmin) {
      res.status(200).json(saveNewAdmin);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Failed to register!" });
  }
};

module.exports = {
  REGISTER_NEW_ADMIN,
};
