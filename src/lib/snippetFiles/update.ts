import { SnippetFile } from "../../model";
import { notFound } from "../../utils/error";

const update = async (
  id,
  payload: {
    filename: string;
    content: string;
    language: string;
    snippet: string;
  }
) => {
  const snippetFile: any = await SnippetFile.findById(id);

  if (!snippetFile) {
    throw notFound();
  }

  Object.keys(payload).forEach((key) => {
    snippetFile[key] = payload[key] ?? snippetFile[key];
  });

  await snippetFile.save();

  return {
    ...snippetFile._doc,
    id: snippetFile.id,
  };
};

export default update;
