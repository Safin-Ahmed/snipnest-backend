import { Snippet, StarReact } from "../../model";
import { notFound } from "../../utils/error";

const create = async ({ snippetId, userId }) => {
  const snippet: any = Snippet.findById(snippetId);

  if (!snippet) {
    throw notFound("Snippet not found");
  }

  const star: any = new StarReact({
    snippet: snippetId,
    profile: userId,
  });

  await star.save();

  return {
    ...star._doc,
    id: star.id,
  };
};

export default create;
