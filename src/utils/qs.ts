const generateQueryString = (query) =>
  Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
    )
    .join("&");

export { generateQueryString };
