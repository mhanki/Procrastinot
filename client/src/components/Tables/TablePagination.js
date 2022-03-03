import React from 'react';
import { 
  CardFooter,
  Pagination,
  PaginationLink,
  PaginationItem
} from "reactstrap";

const PaginationNavigation = ({icon}) => (
  <PaginationItem /* className="disabled" */>
    <PaginationLink
      href="#"
      onClick={(e) => e.preventDefault()}
    >
      <i className={icon} />
    </PaginationLink>
  </PaginationItem>
)

const TablePagination = ({pages}) => {
  return(
    <CardFooter className="py-3">
      <nav aria-label="...">
        <Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
        >
          <PaginationNavigation icon="fas fa-angle-left" />
          {pages.map(page => (
            <PaginationItem className={page.active ? "active" : ""}>
              <PaginationLink
                href="#"
                onClick={(e) => e.preventDefault()}
              >{page.number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNavigation icon="fas fa-angle-right" />
        </Pagination>
      </nav>
    </CardFooter>
  )
}

export default TablePagination;