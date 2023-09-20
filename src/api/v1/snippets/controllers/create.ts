import snippetService from "../../../../lib/snippets";
const create = async (req, res, next) => {
  try {
    const { title, description, languages, snippet_files, status } = req.body;

    const snippet = await snippetService.create({
      title,
      description,
      languages,
      snippet_files,
      status,
      snipper: req.user.id,
    });

    const response = {
      code: 201,
      message: "Snippet created successfully",
      data: {
        ...snippet,
      },
      links: {
        self: `${process.env.ROOT}/snippets/${snippet.id}`,
        comments: `${process.env.ROOT}/snippets/${snippet.id}/comments`,
        stars: `${process.env.ROOT}/snippets/${snippet.id}/stars`,
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export default create;
