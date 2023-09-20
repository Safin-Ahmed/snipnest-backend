import { SnippetFile } from "../../model";
import { notFound } from "../../utils/error";

const removeItem = async (id) => {
  const snippet = await SnippetFile.findById(id);
  if (!snippet) {
    throw notFound();
  }

  return SnippetFile.findByIdAndDelete(id);
};

export default removeItem;
