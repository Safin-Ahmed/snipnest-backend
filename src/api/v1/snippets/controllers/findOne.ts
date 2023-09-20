import snippetService from "../../../../lib/snippets";

const findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expand = req.query.expand || [];
    const fields = req.query.fields || [];

    const snippet = await snippetService.findOne({ id, expand, fields });

    const response = {
      data: snippet,
      links: {
        self: `${process.env.ROOT}/public/snippets/${id}`,
        comments: `${process.env.ROOT}/public/snippets/${id}/comments`,
        stars: `${process.env.ROOT}/public/snippets/${id}/stars`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default findOne;
