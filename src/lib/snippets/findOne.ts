import { Snippet } from "../../model";
import { notFound } from "../../utils/error";

const findOne = async ({ id, expand, fields }) => {
  const snippet: any = await Snippet.findById(id).select(fields);

  if (!snippet) {
    throw notFound();
  }

  if (expand.includes("snipper")) {
    await snippet.populate("snipper");
  }

  if (expand.includes("snippet_files")) {
    await snippet.populate("snippet_files");
  }

  return {
    ...snippet._doc,
    id: snippet.id,
  };
};

export default findOne;
