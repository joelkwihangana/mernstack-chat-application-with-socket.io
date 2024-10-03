import jwt from "jsonwebtoken";
//create a JWT token function
const secret = process.env.JWT_SECRET;
export const generateToken = (userId: string) => {
  return jwt.sign({ userId: userId }, secret as string, {
    expiresIn: "1d", //token expires in 1 day
  });
};
