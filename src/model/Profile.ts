import { Schema, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    _id: {
      type: "ObjectId",
      ref: "User",
    },
    display_name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true,
    },
    job_title: {
      type: String,
      default: "Your current job title",
    },
    bio: {
      type: String,
      maxLength: 300,
      minLength: 5,
      default: "Write what you do",
    },
    follower_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, id: true, strict: false }
);

const Profile = model("Profile", ProfileSchema);

export default Profile;
