import jwt from "jsonwebtoken";
import { RefreshToken } from "../../model";
const checkTokenValidity = async (token) => {
  const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");
  const refreshToken: any = await RefreshToken.findById(decode.id);

  if (!refreshToken || !refreshToken.isActive) {
    return false;
  }

  return true;
};

export default checkTokenValidity;
