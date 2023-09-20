import snippetService from "../lib/snippets";
import commentService from "../lib/comments";
import starService from "../lib/stars";
import snippetFileService from "../lib/snippetFiles";
import { authzError } from "../utils/error";
const ownership =
  (model = "") =>
  async (req, res, next) => {
    try {
      let isOwner = false;
      if (model === "Snippet") {
        isOwner = await snippetService.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });
      }

      if (model === "Comment") {
        isOwner = await commentService.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });
      }

      if (model === "StarReact") {
        isOwner = await starService.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });
      }

      if (model === "SnippetFile") {
        isOwner = await snippetFileService.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });
      }

      if (isOwner) {
        return next();
      } else {
        return next(authzError());
      }
    } catch (err) {
      next(err);
    }
  };

export default ownership;
