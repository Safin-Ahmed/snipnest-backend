import { Snippet } from "../../model";
import { notFound } from "../../utils/error";

const removeItem = async (id) => {
  const snippet = await Snippet.findById(id);
  if (!snippet) {
    throw notFound();
  }

  return Snippet.findByIdAndDelete(id);
};

export default removeItem;
