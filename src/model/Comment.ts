import { Schema, model } from "mongoose";
import Snippet from "./Snippet";

const CommentSchema = new Schema(
  {
    snippet: {
      type: "ObjectId",
      ref: "Snippet",
      required: true,
    },
    profile: {
      type: "objectId",
      ref: "Profile",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: true, strict: false }
);

CommentSchema.post("findOneAndDelete", async function (doc, next) {
  const snippet: any = await Snippet.findById(doc.snippet);
  const totalComments = snippet.totalComments;
  if (totalComments < 0) {
    return;
  }
  snippet.totalComments = totalComments - 1;

  await snippet.save();

  next();
});

CommentSchema.post("save", async function (doc, next) {
  const snippet: any = await Snippet.findById(doc.snippet);
  const totalComments = snippet.totalComments;

  snippet.totalComments = totalComments + 1;

  await snippet.save();

  next();
});

const Comment = model("Comment", CommentSchema);

export default Comment;
