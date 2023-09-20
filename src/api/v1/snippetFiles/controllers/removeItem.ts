import snippetFileService from "../../../../lib/snippetFiles";
const removeItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await snippetFileService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export default removeItem;
