import { Comment } from "../../model";
import { notFound } from "../../utils/error";

const removeItem = async (id) => {
  const comment = Comment.findById(id);
  if (!comment) {
    throw notFound();
  }

  return Comment.findByIdAndDelete(id);
};

export default removeItem;
