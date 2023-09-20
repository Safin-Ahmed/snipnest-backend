import snippetService from "../../../../lib/snippets";
const removeItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await snippetService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export default removeItem;
