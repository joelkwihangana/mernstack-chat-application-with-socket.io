import express from "express";
import registerUser from "../controllers/userControllers";

const router = express.Router();

router.route("/").post(registerUser);

// router.post('/login',authUser)

export default router;
