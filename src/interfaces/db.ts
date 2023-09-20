import { Document, ObjectId } from "mongoose";
export interface IRefreshToken extends Document {
  user: string;
  issuedIp: string;
  token: string;
  replacedByToken?: ObjectId;
  expireAt: Date;
  revokedAt?: Date;
  revokedIp?: string;
  isExpired: boolean;
  isActive: boolean;
}
