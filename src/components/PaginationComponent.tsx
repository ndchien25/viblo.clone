import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, lastPage, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      onPageChange(newPage);
    }
  };

  const paginationLinks = () => {
    const links = [];
    const range = 2; // Number of pages to show before and after the current page
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(lastPage, currentPage + range);

    // Add the first page and an ellipsis if necessary
    if (startPage > 1) {
      links.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        links.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add the last page and an ellipsis if necessary
    if (endPage < lastPage) {
      if (endPage < lastPage - 1) {
        links.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      links.push(
        <PaginationItem key={lastPage}>
          <PaginationLink
            onClick={() => handlePageChange(lastPage)}
          >
            {lastPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {paginationLinks()}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
