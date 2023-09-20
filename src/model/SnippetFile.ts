import { Schema, model } from "mongoose";
import Snippet from "./Snippet";

const SnippetFileSchema = new Schema(
  {
    filename: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
    },
    content: String,
    language: String,
    snippet: {
      type: "ObjectId",
      ref: "Snippet",
    },
    snipper: {
      type: "ObjectId",
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true, id: true, strict: false }
);

SnippetFileSchema.post("findOneAndDelete", async function (doc, next) {
  if (!doc.snippet) {
    return;
  }
  const snippet: any = await Snippet.findById(doc.snippet);
  snippet.snippet_files = snippet.snippet_files.filter(
    (item) => item.toString() !== doc._id.toString()
  );

  await snippet.save();

  next();
});

SnippetFileSchema.post("save", async function (doc, next) {
  if (!doc.snippet) {
    return;
  }

  const snippet: any = await Snippet.findById(doc.snippet);

  if (snippet.snippet_files.includes(doc._id)) {
    return;
  }
  snippet.snippet_files.push(doc._id);
  await snippet.save();

  next();
});

const SnippetFile = model("SnippetFile", SnippetFileSchema);

export default SnippetFile;
