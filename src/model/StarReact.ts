import { Schema, model } from "mongoose";
import Snippet from "./Snippet";

const StarReactSchema = new Schema(
  {
    snippet: {
      type: "ObjectId",
      ref: "Snippet",
      required: true,
    },
    profile: {
      type: "ObjectId",
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true, id: true, strict: false }
);

StarReactSchema.post("findOneAndDelete", async function (doc, next) {
  const snippet: any = await Snippet.findById(doc.snippet);
  const totalStars = snippet.totalStars;
  if (totalStars < 0) {
    return;
  }
  snippet.totalStars = totalStars - 1;

  await snippet.save();

  next();
});

StarReactSchema.post("save", async function (doc, next) {
  const snippet: any = await Snippet.findById(doc.snippet);
  const totalStars = snippet.totalStars;

  snippet.totalStars = totalStars + 1;

  await snippet.save();

  next();
});

const StarReact = model("StarReact", StarReactSchema);

export default StarReact;
