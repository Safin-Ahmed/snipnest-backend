import defaults from "../../config/default";
import { Comment, Snippet } from "../../model";
import { notFound } from "../../utils/error";

// Find All Snippets
const findAllComments = async (
  snippetId,
  {
    page = defaults.page,
    limit = defaults.limit,
    sort = defaults.sort,
    search = defaults.search,
  }
) => {
  const snippet = await Snippet.findById(snippetId);

  if (!snippet) {
    throw notFound();
  }

  const sortType = sort.split(":")[1];
  const sortBy = sort.split(":")[0];

  const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const hasSearch = search.length > 0;
  let filter: any = { snippet: snippetId };
  if (hasSearch) {
    filter = {
      snippet: snippetId,
      $or: [
        {
          content: { $regex: search, $options: "i" },
        },
      ],
    };
  }

  const comments: any = await Comment.find(filter)
    .populate({
      path: "profile",
    })
    .sort(sortString)
    .skip(page * limit - limit)
    .limit(limit);

  return comments.map((comment) => ({
    ...comment._doc,
    id: comment.id,
  }));
};

export default findAllComments;
