import defaults from "../../config/default";
import { StarReact, Snippet } from "../../model";
import { notFound } from "../../utils/error";

// Find All Snippets
const findAllStars = async (
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
    throw notFound("Snippet not found!");
  }

  const sortType = sort.split(":")[1];
  const sortBy = sort.split(":")[0];

  const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const hasSearch = search.length > 0;
  let filter: any = { snippet: snippetId };
  if (hasSearch) {
    filter = {
      snippet: snippetId,
      profile: {
        displayName: { $regex: search, $options: "i" },
      },
    };
  }

  const stars: any = await StarReact.find(filter)
    .populate([
      {
        path: "profile",
        select: "display_name",
        populate: {
          path: "_id",
          select: "avatar",
        },
      },
      {
        path: "snippet",
        select: "title",
      },
    ])
    .sort(sortString)
    .skip(page * limit - limit)
    .limit(limit);

  const transformedResults = stars.map((item) => ({
    id: item.id,
    profile: {
      display_name: item.profile.display_name,
      avatar: item._id.avatar,
    },
    snippet: item.snippet,
  }));

  return transformedResults;
};

export default findAllStars;
