import defaults from "../config/default";
import { generateQueryString } from "./qs";

const getPagination = (config) => {
  const limit = config.limit || defaults.limit;
  const totalItems = config.totalItems || defaults.totalItems;
  const totalPage = Math.ceil(totalItems / limit);
  const page = config.page || defaults.page;
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination["next"] = page + 1;
  }

  if (page > 1) {
    pagination["prev"] = page - 1;
  }

  return pagination;
};

const getHATEOASForAllItems = ({
  url = "/",
  hasNext = false,
  hasPrev = false,
  page = 1,
  path = "",
  query = {},
}) => {
  // HATEOAS Links
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links["next"] = `${path}?${queryStr}`;
  }

  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links["prev"] = `${path}?${queryStr}`;
  }

  return links;
};

const getTransformedItems = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid Arguments");
  }

  if (selection.length === 0) {
    return items.map((item: any) => ({ ...item, link: `${path}/${item._id}` }));
  }

  return items.map((item: any) => {
    const result: any = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item._id}`;

    return result;
  });
};

export { getPagination, getHATEOASForAllItems, getTransformedItems };
