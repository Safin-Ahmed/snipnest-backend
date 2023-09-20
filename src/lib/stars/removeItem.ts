import { StarReact } from "../../model";
import { notFound } from "../../utils/error";

const removeItem = async (starId) => {
  const starReact = StarReact.findById(starId);
  if (!starReact) {
    throw notFound();
  }

  return StarReact.findByIdAndDelete(starId);
};

export default removeItem;
