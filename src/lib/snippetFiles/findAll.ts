import defaults from "../../config/default";
import { SnippetFile } from "../../model";

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
          language: { $regex: search, $options: "i" },
          content: { $regex: search, $options: "i" },
        },
      ],
    };
  }

  const snippetFiles: any = await SnippetFile.find(filter)
    .populate({
      path: "snipper",
    })
    .sort(sortString)
    .skip(page * limit - limit)
    .limit(limit);

  return snippetFiles.map((file) => ({
    ...file._doc,
    id: file.id,
  }));
};

export default findAll;
