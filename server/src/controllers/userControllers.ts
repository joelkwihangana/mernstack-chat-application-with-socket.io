import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateToken } from "../config/generateToken";

// Define the expected structure of the request body for registration
interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  pic?: string;
}

// Register user controller
export const registerUser = expressAsyncHandler(
  async (req: Request<{}, {}, IRegisterRequestBody>, res: Response) => {
    const { name, email, password, pic } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User with this email already exists.");
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password, // Password hashing is handled in the model's pre-save middleware
      profilePicture: pic,
    });

    // Send response with user data and JWT token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.profilePicture,
        token: generateToken(user._id.toString()), // Generate JWT token
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user.");
    }
  }
);

// Define the expected structure of the request body for login
interface ILoginRequestBody {
  email: string;
  password: string;
}

// Login user controller
export const authUser = expressAsyncHandler(
  async (req: Request<{}, {}, ILoginRequestBody>, res: Response) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400);
      throw new Error("Both email and password are required.");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Email not found in the database.");
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }
    console.log("Login successful!");

    // Send response with user data and JWT token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.profilePicture,
      token: generateToken(user._id.toString()), // Convert ObjectId to string
    });
  }
);
