/**
 * UserManagementController implementation
 */

import User from "../models/User.js";

import bcrypt from "bcrypt";

/* Function to get all Users */
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to get a single user */
const getuser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });

    if (user[0]) {
      res.status(200).json({
        message: "User found",
        user: user,
      });
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to add a new User */
const addUser = async (req, res) => {
  try {
    const { userRegNo, firstName, lastName, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userRegNo,
      firstName,
      lastName,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
};

/* Function to update an user */
const updateuser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });

    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            userRegNo: req.body.userRegNo,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // password: req.body.password,
            role: req.body.role,
          },
        },
        {
          new: true,
        }
      );

      if (updatedUser) {
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Failed to update user",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to delete an user */
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedUser) {
      res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } else {
      res.status(400).json({
        message: "Failed to delete user",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// const updatePassword = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { currentPassword, newPassword } = req.body;

//     // Find the user by ID
//     const user = await User.findById(id);

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the current password is correct
//     const isPasswordValid = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(400).json({ error: "Current password is incorrect" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     user.password = hashedPassword;

//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



/* Function to get a single user */
const checkIndex = async (req, res) => {
  const {userRegNo} = req.params;
  console.log(userRegNo);
  try {
    const user = await User.find({ userRegNo: userRegNo });
    console.log(user);
    if (user[0]) {
      res.status(200).json({
        message: "User found",
        user: user,
      });
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userController = {
  getAllUsers,
  getuser,
  addUser,
  updateuser,
  deleteUser,
  checkIndex,
//   updatePassword,
};

export default userController;
