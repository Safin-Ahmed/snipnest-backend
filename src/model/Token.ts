import { Schema, model } from "mongoose";
import { isAfter } from "date-fns";
import { IRefreshToken } from "../interfaces/db";

const refreshTokenSchema = new Schema(
  {
    user: {
      type: "ObjectId",
      ref: "User",
      required: true,
    },
    issuedIp: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    replacedByToken: {
      type: "ObjectId",
      ref: "Token",
    },
    expireAt: {
      type: Date,
      required: true,
    },
    revokedAt: Date,
    revokedIp: String,
  },
  { timestamps: true, id: true, strict: false }
);

refreshTokenSchema.virtual("isExpired").get(function (this: IRefreshToken) {
  return isAfter(new Date(), new Date(this.expireAt));
});

refreshTokenSchema.virtual("isActive").get(function (this: IRefreshToken) {
  return !this.revokedAt && !this.isExpired;
});

refreshTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
