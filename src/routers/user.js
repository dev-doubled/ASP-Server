import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";
// import { authenticateToken } from "../middleware/AuthMiddleware.js";

// GET METHODS
router.get("/getListUserByName/:userName", userController.getListUserByName);

router.get("/getListUser", userController.getListUser);

router.get("/getListUserByEmail/:email", userController.getListUserByEmail);

router.get("/getUserById/:id", userController.getUserById);

// POST METHODS
router.post("/updateStatusUser/:id", userController.updateStatusUser);

router.post("/updateUser/:id", userController.updateUser);

export default router;
