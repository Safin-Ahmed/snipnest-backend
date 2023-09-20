import { ICustomError } from "../../interfaces";
import { User } from "../../model";
import bcrypt from "bcryptjs";
import { generateTokens } from "../../utils";

const loginUser = async ({ email, password, clientIp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error: ICustomError = new Error("User not found!");
    error.status = 404;
    throw error;
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    const error: ICustomError = new Error("Invalid password");
    error.status = 400;
    throw error;
  }

  const { accessToken, refreshToken } = await generateTokens(user, clientIp);

  return { accessToken, refreshToken };
};

export default loginUser;
