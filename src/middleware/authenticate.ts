import { ICustomError } from "../interfaces";
import jwt from "jsonwebtoken";
import { User } from "../model";

const authenticate = async (req, res, next) => {
  try {
    // extract the token from authorization header
    let token = req.headers.authorization;

    // throw an error if there is no token
    if (!token) {
      const error: ICustomError = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    // split the token by whitespace to get the actual token
    token = token.split(" ")[1];

    // decode the jwt token
    const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");

    // find the user by the id recieved from access token
    const user = await User.findById(decode.id).select("-password");

    // throw 404 error if no user is found in database
    if (!user) {
      const error: ICustomError = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    // attach the user object in request
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
