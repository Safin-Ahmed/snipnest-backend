import commentService from "../../../../lib/comments";
const postComment = async (req, res, next) => {
  const content = req.body.content;
  const snippetId = req.params.id;
  const payload = {
    content,
    userId: req.user.id,
    snippetId,
  };

  const comment = await commentService.create(payload);

  const response = {
    code: 201,
    message: "Comment posted successfully!",
    data: comment,
    links: {
      self: `${process.env.ROOT}/admin/comments/${comment.id}`,
      snippet: `${process.env.ROOT}/public/snippets/${snippetId}`,
    },
  };

  res.status(201).json(response);
};

export default postComment;
