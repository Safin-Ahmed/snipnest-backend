import { Comment, Snippet } from "../../model";
import { notFound } from "../../utils/error";

const create = async ({ snippetId, userId, content }) => {
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw notFound("Snippet not found");
  }
  const comment: any = new Comment({
    snippet: snippetId,
    profile: userId,
    content,
  });

  await comment.save();

  snippet.totalComments = snippet.totalComments + 1;

  await snippet.save();

  return {
    ...comment._doc,
    id: comment.id,
  };
};

export default create;
