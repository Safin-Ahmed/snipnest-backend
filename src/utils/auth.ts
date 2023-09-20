import jwt from "jsonwebtoken";
import { RefreshToken } from "../model";
import { addDays } from "date-fns";
const JWT_SECRET = process.env.JWT_SECRET || "";
export const generateTokens = async (user, clientIp) => {
  // Access Token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  // Refresh Token
  const refreshTokenObject = new RefreshToken({
    user: user.id,
    issuedIp: clientIp || "N/A",
    token: "",
    expireAt: addDays(new Date(), 30),
  });

  const refreshToken = jwt.sign(
    {
      id: refreshTokenObject.id,
      user_id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
    JWT_SECRET,
    { algorithm: "HS256" }
  );

  refreshTokenObject.token = refreshToken;

  await refreshTokenObject.save();

  return {
    accessToken: token,
    refreshToken,
    refreshTokenId: refreshTokenObject._id,
  };
};
