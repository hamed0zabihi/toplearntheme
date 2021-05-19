import _ from "lodash";

export const paginate = (courses, currentPage, perPage) => {
  const startIndex = (currentPage - 1) * perPage;
  return _(courses).drop(startIndex).take(perPage).value();
};
