import { SnippetFile } from "../../model";

// Count the number of total snippets
const count = ({ search = "" }) => {
  const filter =
    search.length > 0
      ? {
          $or: [
            {
              title: { $regex: search, $options: "i" },
              languages: { $in: search.split(",").map((item) => item.trim()) },
              description: { $regex: search, $options: "i" },
            },
          ],
        }
      : {};

  return SnippetFile.count(filter);
};

export default count;
