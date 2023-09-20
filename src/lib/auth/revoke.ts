import jwt from "jsonwebtoken";
import { RefreshToken } from "../../model";
import { ICustomError } from "../../interfaces";
const revokeToken = async (token, clientIp) => {
  const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");
  const refreshToken: any = await RefreshToken.findById(decode.id);

  if (!refreshToken || !refreshToken.isActive) {
    const error: ICustomError = new Error("Invalid token!");
    error.status = 400;
    throw error;
  }

  refreshToken.revokedAt = new Date();
  refreshToken.revokedIp = clientIp;

  await refreshToken.save();

  return refreshToken;
};

export default revokeToken;
