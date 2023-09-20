import { Comment } from "../../model";
import { notFound } from "../../utils/error";

const checkOwnership = async ({ resourceId, userId }) => {
  const comment: any = await Comment.findById(resourceId);

  if (!comment) throw notFound();

  if (comment._doc.profile.toString() === userId) {
    return true;
  } else return false;
};

export default checkOwnership;
