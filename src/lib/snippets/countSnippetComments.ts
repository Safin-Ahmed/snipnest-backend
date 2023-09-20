import { Comment } from "../../model";

// Count the number of total comments of a snippet
const countSnippetComments = (snippetId, { search = "" }) => {
  let filter: any = { snippet: snippetId };
  if (search.length > 0) {
    filter = {
      snippet: snippetId,
      $or: [
        {
          content: { $regex: search, $options: "i" },
        },
      ],
    };
  }

  return Comment.count(filter);
};

export default countSnippetComments;
