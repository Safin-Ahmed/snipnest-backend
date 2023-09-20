import starService from "../../../../lib/stars";
const removeItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await starService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export default removeItem;
