import defaults from "../../../../config/default";
import snippetService from "../../../../lib/snippets";
import { getHATEOASForAllItems, getPagination } from "../../../../utils";

const findAllComments = async (req, res, next) => {
  const snippetId = req.params.id;
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sort = req.query.sort || defaults.sort;
  const search = req.query.search || defaults.search;

  try {
    const comments = await snippetService.findAllComments(snippetId, {
      page,
      limit,
      sort,
      search,
    });

    // Pagination
    const totalItems = await snippetService.countSnippetComments(snippetId, {
      search,
    });
    const pagination: any = getPagination({
      totalItems,
      limit,
      page,
    });

    // HATEOAS Links

    const links = getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    // Response
    res.status(200).json({
      data: comments,
      pagination,
      links,
    });
  } catch (err) {
    next(err);
  }
};

export default findAllComments;
