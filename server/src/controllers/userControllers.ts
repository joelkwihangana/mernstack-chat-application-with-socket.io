import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateToken } from "../config/generateToken";

// Define the expected structure of the request body
interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  pic?: string;
  // _id?: string;
}

//register user
const registerUser = expressAsyncHandler(
  async (req: Request<{}, {}, IRegisterRequestBody>, res: Response) => {
    const { name, email, password, pic } = req.body;
    //validate inputs
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }
    //check if user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("Email already exists");
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    //create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture: pic,
    });
    //generate and send jwt token
    if (user) {
      // If user creation is successful, generate a JWT
      const token = generateToken(user._id as any);
      //send back the user information along with the token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.profilePicture,
        token, // Send the JWT back to the client
      });
    } else {
      res.status(400);
      throw new Error("Error creating user");
    }
  }
);

export default registerUser;
