import { SnippetFile } from "../../model";
import { notFound } from "../../utils/error";

const findOne = async ({ id, expand, fields }) => {
  const snippetFile: any = await SnippetFile.findById(id).select(fields);

  if (!snippetFile) {
    throw notFound();
  }

  if (expand.includes("snipper")) {
    await snippetFile.populate("snipper");
  }

  if (expand.includes("snippet")) {
    await snippetFile.populate("snippet");
  }

  return {
    ...snippetFile._doc,
    id: snippetFile.id,
  };
};

export default findOne;
