import jwt from "jsonwebtoken";
import { RefreshToken, User } from "../../model";
import { ICustomError } from "../../interfaces";
import { generateTokens } from "../../utils";

const refreshToken = async (token, clientIp) => {
  // Decoding the provided refresh token
  const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");

  // Finding the old refresh token in database
  const oldRefreshToken: any = await RefreshToken.findById(decode.id);

  // Throw error if old token is not found or inactive
  if (!oldRefreshToken || !oldRefreshToken.isActive) {
    const error: ICustomError = new Error("Invalid Token");
    error.status = 400;
    throw error;
  }

  // deactivate the old refresh token
  oldRefreshToken.revokedAt = new Date();
  oldRefreshToken.revokedIp = clientIp;

  // get the user with the id from decoded refresh token
  const user = await User.findOne({ _id: decode.user_id });

  // throw error if user is not found
  if (!user) {
    const error: ICustomError = new Error("User not found!");
    error.status = 404;
    throw error;
  }

  // generate new tokens
  const { accessToken, refreshToken, refreshTokenId } = await generateTokens(
    user,
    clientIp
  );

  // update the old refresh token replacedBy field by new token's id
  oldRefreshToken.replacedByToken = refreshTokenId;

  // Save old refresh token
  await oldRefreshToken.save();

  // return the new tokens
  return { accessToken, refreshToken };
};

export default refreshToken;
