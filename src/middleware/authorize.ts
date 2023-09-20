import { ICustomError } from "../interfaces";

const authorize = (roles) => (req, res, next) => {
  if (roles.some((role) => req.user.roles.includes(role))) {
    return next();
  } else {
    const error: ICustomError = new Error("You do not have enough permissions");

    error.status = 403;

    throw error;
  }
};

export default authorize;
