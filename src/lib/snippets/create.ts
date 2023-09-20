import { Snippet } from "../../model";
import { badRequest } from "../../utils/error";

const create = async ({
  title,
  description = "",
  languages = [],
  snippet_files = [],
  status = "draft",
  snipper,
}) => {
  if (!title || !snipper) {
    throw badRequest();
  }

  const snippet: any = new Snippet({
    title,
    description,
    languages,
    snippet_files,
    status,
    snipper,
  });

  await snippet.save();

  return {
    ...snippet._doc,
    id: snippet.id,
  };
};

export default create;
