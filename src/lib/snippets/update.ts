import { Snippet } from "../../model";
import { notFound } from "../../utils/error";

const update = async (
  id,
  payload: {
    title: string;
    description: string;
    languages: string[];
    snippet_files: string[];
    status: string;
  }
) => {
  const snippet: any = await Snippet.findById(id);

  if (!snippet) {
    throw notFound();
  }

  Object.keys(payload).forEach((key) => {
    snippet[key] = payload[key] ?? snippet[key];
  });

  await snippet.save();

  return {
    ...snippet._doc,
    id: snippet.id,
  };
};

export default update;
