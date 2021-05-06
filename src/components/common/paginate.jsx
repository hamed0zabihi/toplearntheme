import _ from "lodash";

export const paginate = (courses, currentPage, perPage) => {
  const startIndex = (currentPage - 1) * perPage;
  // console.log(startIndex);
  // console.log(courses);
  const a = _(courses).drop(startIndex).take(perPage).value();
  // console.log(a);
  return _(courses).drop(startIndex).take(perPage).value();
};
