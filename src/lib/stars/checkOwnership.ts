import { StarReact } from "../../model";
import { notFound } from "../../utils/error";

const checkOwnership = async ({ resourceId, userId }) => {
  const star: any = await StarReact.findById(resourceId);

  if (!star) throw notFound();

  if (star._doc.profile.toString() === userId) {
    return true;
  } else return false;
};

export default checkOwnership;
