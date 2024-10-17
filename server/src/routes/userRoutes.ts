import express from "express";
import {
  authUser,
  getUsersController,
  registerUser,
} from "../controllers/userControllers";

const router = express.Router();

// POST for user registration, GET for retrieving/searching users
router.route("/").post(registerUser).get(getUsersController);

router.post("/login", authUser);

export default router;
