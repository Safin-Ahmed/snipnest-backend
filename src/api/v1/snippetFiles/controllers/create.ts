import snippetFileService from "../../../../lib/snippetFiles";
const create = async (req, res, next) => {
  try {
    const { filename, content, language, snippet } = req.body;

    const snippetFile = await snippetFileService.create({
      filename,
      content,
      language,
      snippet,
      snipper: req.user.id,
    });

    const response = {
      code: 201,
      message: "Snippet File created successfully",
      data: {
        ...snippetFile,
      },
      links: {
        self: `${process.env.ROOT}/public/snippets/files/${snippetFile.id}`,
      },
    };

    if (snippet) {
      response.links[
        "snippet"
      ] = `${process.env.ROOT}/public/snippets/${snippet}`;
    }

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export default create;
