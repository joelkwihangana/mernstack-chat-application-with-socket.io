import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

// Define the expected structure of the request body
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  pic?: string;
}

const registerUser = expressAsyncHandler(
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User with this email already exists!");
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.profilePicture,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  }
);

export default registerUser;
