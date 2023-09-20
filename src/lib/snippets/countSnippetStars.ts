import { StarReact } from "../../model";

// Count the number of total stars of a snippet
const countSnippetStars = (snippetId, { search = "" }) => {
  let filter: any = { snippet: snippetId };
  if (search.length > 0) {
    filter = {
      snippet: snippetId,
      profile: {
        displayName: { $regex: search, $options: "i" },
      },
    };
  }

  return StarReact.count(filter);
};

export default countSnippetStars;
