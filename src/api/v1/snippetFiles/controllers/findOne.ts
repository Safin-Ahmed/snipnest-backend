import snippetFileService from "../../../../lib/snippetFiles";

const findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expand = req.query.expand || [];
    const fields = req.query.fields || [];

    const snippetFile = await snippetFileService.findOne({
      id,
      expand,
      fields,
    });

    const response: any = {
      data: snippetFile,
      links: {
        self: `${process.env.ROOT}/public/snippets/files/${id}`,
      },
    };

    if (snippetFile.snippet && typeof snippetFile.snippet === "string") {
      response.links.snippet = `${process.env.ROOT}/public/snippets/${snippetFile.snippet}`;
    }

    if (snippetFile.snippet && typeof snippetFile.snippet === "object") {
      response.links.snippet = `${process.env.ROOT}/public/snippets/${snippetFile.snippet._id}`;
    }

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default findOne;
