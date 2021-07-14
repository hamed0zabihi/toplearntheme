import React from "react";
import { range } from "lodash";

const Pagination = ({ totalpages, currentpage, perpage, handlePageChage }) => {
  const pageCount = Math.ceil(totalpages / perpage);
  if (pageCount === 1) return null;

  const pageCounter = range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination-fix">
        {pageCounter.map((pages) => (
          <li key={pages}>
            <div
              className={
                pages === currentpage ? "page-link actives" : "page-link"
              }
              onClick={() => handlePageChage(pages)}
            >
              {pages}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
