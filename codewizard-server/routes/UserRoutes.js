/**
 * User Routes implementation
 */
import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

// Handle POST request at "/" URI
router.post("/", userController.addUser);

// Handle GET request at "/" URI
router.get("/", userController.getAllUsers);

// Handle GET request at "/:id" URI
router.get("/:id", userController.getuser);

// Handle GET request at "/checkregistration/:userRegNo" URI
router.get("/checkregistration/:userRegNo", userController.checkIndex);



// Handle PUT request at "/:id" URI
router.put("/:id", userController.updateuser);

// Handle DELETE request at "/:id" URI
router.delete("/:id", userController.deleteUser);

// update only password
// router.put('/updatepassword/:id', userController.updatePassword);

export default router;