import commentService from "../../../../lib/comments";
const removeItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await commentService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export default removeItem;
