import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Utilisateur inconnue" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "Connecte avec succes", token});
    } else {
      res.json({ success: false, message: "mots de pass incorrect" });
    }
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message})
  }
};

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: true, message: "user already exists" });
    }

    if (!validator.isEmail) {
      res.json({ success: true, message: "please enter a valid adress" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, message: "Compte cree avec succes", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default {
  login,
  register,
};
