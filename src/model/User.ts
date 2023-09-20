import { Schema, model } from "mongoose";
import Profile from "./Profile";
import { faker } from "@faker-js/faker";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 50,
      minLength: 5,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      default: faker.internet.avatar,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["User", "Admin"],
      default: ["User"],
    },
  },
  { timestamps: true, id: true, strict: false }
);

UserSchema.post("save", async function (doc, next) {
  const newProfile = new Profile({
    _id: doc._id,
    display_name: doc.username,
  });

  await newProfile.save();

  next();
});

const User = model("User", UserSchema);

export default User;
