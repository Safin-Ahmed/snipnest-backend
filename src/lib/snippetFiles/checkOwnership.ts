import { SnippetFile } from "../../model";
import { notFound } from "../../utils/error";

const checkOwnership = async ({ resourceId, userId }) => {
  const snippetFile: any = await SnippetFile.findById(resourceId);

  if (!snippetFile) throw notFound();

  if (snippetFile._doc.snipper.toString() === userId) {
    return true;
  } else return false;
};

export default checkOwnership;
