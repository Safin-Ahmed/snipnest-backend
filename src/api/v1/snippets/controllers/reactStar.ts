import starService from "../../../../lib/stars";
const reactStar = async (req, res, next) => {
  const snippetId = req.params.id;
  const payload = {
    userId: req.user.id,
    snippetId,
  };

  const star = await starService.create(payload);

  const response = {
    code: 201,
    message: "Star added successfully!",
    data: star,
    links: {
      self: `${process.env.ROOT}/admin/stars/${star.id}`,
      snippet: `${process.env.ROOT}/public/snippets/${snippetId}`,
    },
  };

  res.status(201).json(response);
};

export default reactStar;
