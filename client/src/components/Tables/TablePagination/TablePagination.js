import React from 'react';
import { 
  CardFooter,
  Pagination,
  PaginationLink,
  PaginationItem as BPaginationItem
} from "reactstrap";

const PaginationItem = ({content, active=false, link, onClick, icon=false}) => (
  <BPaginationItem className={active ? "active" : ""} >
    <PaginationLink href={link} onClick={onClick} >
      {icon
        ? <i className={content} />
        : content
      }
    </PaginationLink>
  </BPaginationItem>
)

const TablePagination = ({pages}) => {
  const handleClick = (e) => e.preventDefault();
  
  return(
    <CardFooter className="py-3">
      <nav>
        <Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
        >
          <PaginationItem content="fas fa-angle-left" link="#" onClick={handleClick} icon={true} />
            {pages.map(page => (
              <PaginationItem 
                key={page.number}
                content={page.number} 
                link="#" 
                onClick={handleClick} 
                active={page.active} />
            ))}
          <PaginationItem content="fas fa-angle-right" link="#" onClick={handleClick} icon={true} />
        </Pagination>
      </nav>
    </CardFooter>
  )
}

export default TablePagination;