import { User } from "../model";

export const verifyUsername = async (value) => {
  const user = await User.findOne({ username: value });

  if (user) {
    throw new Error("Username already exists!");
  }
};

export const verifyEmail = async (value) => {
  const user = await User.findOne({ email: value });

  if (user) {
    throw new Error("Email already in use!");
  }
};

export const transformValidationErrors = (error) => {
  console.log({ error });
  return error?.details?.reduce((acc, cur) => {
    acc[cur.path[0]] = cur.message;

    return acc;
  }, {});
};
