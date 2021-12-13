const {
  registerValidation,
  loginValidation,
} = require("../validation/validation.admin");


const Admin = require("../models/model.admin");
const bcrypt = require("bcryptjs");




const REGISTER_NEW_ADMIN = async (req, res) => {
  // Validate Regsitration input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
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
    profile: req.body.profile,
  
  });
  try {
    const saveNewAdmin = await admin.save();
    if (saveNewAdmin) {
      res.status(200).json({data:saveNewAdmin,successMessage:"Successfully Registered!"});

    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Failed to register!" });
  }

};


// Login the admin
const LOGIN_ADMIN = async (req, res) => {
  const { error } =  loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // Check email if already existing to the database
    const admin = await Admin.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!admin || !validPassword) {
      return res.status(400).json({ error: "Invalid email or password!" });
    } 
    // Password is Correct
    // create and assigned token
   
    res.status(200).json({data:admin,successMessage:"Successfully Login!"});
  } catch (err) {
    return res.status(400).json({ error: "Invalid Account!" });
  }
};

module.exports = {
  REGISTER_NEW_ADMIN,
  LOGIN_ADMIN
};
