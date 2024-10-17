import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateToken } from "../config/generateToken";
import { Interface } from "readline";
import { IUser } from "../interfaces/chatInterfaces";

// Define the expected structure of the request body for registration
interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  pic?: string;
}
//interface IRegisterResponse
interface IGetUsersResponse {
  users?: IUser[]; // Optional property for the array of users
  message?: string; // Optional property for an error message
}

// Register user controller
export const registerUser = expressAsyncHandler(
  async (
    req: Request<{}, {}, IRegisterRequestBody>,
    res: Response
  ): Promise<void> => {
    const { name, email, password, pic } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User with this email already exists." });
      return;
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
      res.status(400).json({ message: "Failed to create the user." });
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
  async (
    req: Request<{}, {}, ILoginRequestBody>,
    res: Response
  ): Promise<void> => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({ message: "Both email and password are required" });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Email not found in the database.");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
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

// Get all users or search users by name or email
export const getUsersController = expressAsyncHandler(
  async (req: Request, res: Response<IGetUsersResponse>): Promise<void> => {
    const { name, email } = req.query; // Get search parameters from query string
    console.log("Query params:", req.query);
    //create Filter Object for MongoDB
    const searchFilter: any = {};
    if (name) {
      searchFilter.name = { $regex: name, $options: "i" }; //Case insensitive for name
    }
    if (email) {
      searchFilter.email = { $regex: email, $options: "i" }; //Case insensitive for email
    }
    const users = await User.find(searchFilter); // fetch users based on the search filter

    //check if user(s) exist
    if (users.length === 0) {
      console.log("No users found with the given criteria.");
      res.status(404).json({ message: "No users found." });
      return;
    }

    res.status(200).json({ users }); //Send response with the filtered users data
  }
);
