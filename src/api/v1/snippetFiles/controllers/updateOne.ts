import snippetFileService from "../../../../lib/snippetFiles";
const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const payload = {
    filename: req.body.filename || null,
    content: req.body.content || null,
    language: req.body.language || null,
    snippet: req.body.snippet || null,
  };

  try {
    const snippetFile = await snippetFileService.update(id, payload);

    const response = {
      code: 200,
      message: "Snippet File updated successfully",
      data: snippetFile,
      links: {
        self: `${process.env.ROOT}/public/snippets/files/${id}`,
        snippet: `${process.env.ROOT}/public/snippets/${snippetFile.snippet}`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
