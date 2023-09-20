import { Schema, model } from "mongoose";

const SnippetSchema = new Schema(
  {
    title: String,
    description: String,
    languages: [String],
    totalComments: {
      type: Number,
      default: 0,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "unlisted", "published"],
      default: "published",
    },
    snipper: {
      type: "ObjectId",
      ref: "Profile",
    },
    snippet_files: [
      {
        type: "ObjectId",
        ref: "SnippetFile",
      },
    ],
  },
  { timestamps: true, id: true, strict: false }
);

const Snippet = model("Snippet", SnippetSchema);

export default Snippet;
