import snippetService from "../../../../lib/snippets";
const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const payload = {
    title: req.body.title || null,
    description: req.body.description || null,
    languages: req.body.languages || null,
    snippet_files: req.body.snippet_files || null,
    status: req.body.status || null,
  };

  try {
    const snippet = await snippetService.update(id, payload);

    const response = {
      code: 200,
      message: "Snippet updated successfully",
      data: snippet,
      links: {
        self: `${process.env.ROOT}/public/snippets/${id}`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
