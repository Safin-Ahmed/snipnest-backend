import { Snippet } from "../../model";
import { notFound } from "../../utils/error";

const checkOwnership = async ({ resourceId, userId }) => {
  const snippet: any = await Snippet.findById(resourceId);

  if (!snippet) throw notFound();

  if (snippet._doc.snipper.toString() === userId) {
    return true;
  } else return false;
};

export default checkOwnership;
