import React from "react";
import { range } from "lodash";
const Pagination = ({ totalpages, currentpage, perpage, handlePageChage }) => {
  const pageCount = Math.ceil(totalpages / perpage);
  if (pageCount === 1) return null;
  const pageCounter = range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {pageCounter.map((pages) => (
          <li
            key={pages}
            className={pages === currentpage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => handlePageChage(pages)}>
              {pages}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
