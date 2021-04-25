import _ from "lodash";
export const paginate = (courses, currentPage, perPage) => {
  const startIndex = (currentPage - 1) * perPage;
  return _(courses)
    .slice(startIndex) // page in drop function starts from 0
    .take(perPage) // limit 2
    .value();
};
