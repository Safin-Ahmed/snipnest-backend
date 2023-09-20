import { SnippetFile } from "../../model";
import { badRequest } from "../../utils/error";

const create = async ({
  filename,
  content = "",
  language = "",
  snippet = "",
  snipper,
}) => {
  const snippetFile: any = new SnippetFile({
    filename,
    content,
    language,
    snipper,
  });

  if (snippet) {
    snippetFile.snippet = snippet;
  }

  await snippetFile.save();

  return {
    ...snippetFile._doc,
    id: snippetFile.id,
  };
};

export default create;
