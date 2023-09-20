import defaults from "../../config/default";
import { Snippet } from "../../model";

// Find All Snippets
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sort = defaults.sort,
  search = defaults.search,
}) => {
  const sortType = sort.split(":")[1];
  const sortBy = sort.split(":")[0];

  const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const hasSearch = search.length > 0;
  let filter = {};
  if (hasSearch) {
    filter = {
      $or: [
        {
          title: { $regex: search, $options: "i" },
          languages: { $in: search.split(",").map((item) => item.trim()) },
          description: { $regex: search, $options: "i" },
        },
      ],
    };
  }

  const snippets: any = await Snippet.find(filter)
    .populate({
      path: "snipper",
    })
    .sort(sortString)
    .skip(page * limit - limit)
    .limit(limit);

  return snippets.map((snippet) => ({
    ...snippet._doc,
    id: snippet.id,
  }));
};

export default findAll;
