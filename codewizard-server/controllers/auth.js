import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
// TODO comment this before deploying
export const register = async (req, res) => {
  try {
    const { userRegNo, firstName, lastName, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userRegNo,
      firstName,
      lastName,
      password: passwordHash,
      role: "student",
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { userRegNo, password } = req.body;
    const user = await User.findOne({ userRegNo: userRegNo });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET // eslint-disable-line no-undef
    );
    delete user.password;
    const userObj = {
      id: user._id,
      userRegNo: user.userRegNo,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    res.status(200).json({ token, ...userObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
