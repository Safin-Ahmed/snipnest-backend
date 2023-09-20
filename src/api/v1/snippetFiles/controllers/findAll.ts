import defaults from "../../../../config/default";
import snippetFilesService from "../../../../lib/snippetFiles";
import { getHATEOASForAllItems, getPagination } from "../../../../utils";

const findAll = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sort = req.query.sort || defaults.sort;
  const search = req.query.search || defaults.search;

  try {
    const snippetFiles = await snippetFilesService.findAll({
      page,
      limit,
      sort,
      search,
    });

    // Pagination
    const totalItems = await snippetFilesService.count({ search });
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
      data: snippetFiles,
      pagination,
      links,
    });
  } catch (err) {
    next(err);
  }
};

export default findAll;
