import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Button, PageInfo } from "../styles/Pagination.styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Container>
      <Button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      {totalPages > 1 && (
        <>
          {currentPage > 2 && (
            <Button onClick={() => onPageChange(1)}>1</Button>
          )}

          {currentPage > 1 && (
            <Button onClick={() => onPageChange(currentPage - 1)}>
              {currentPage - 1}
            </Button>
          )}

          {/* <Button disabled={true}>{currentPage}</Button> */}

          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          {currentPage < totalPages && (
            <Button onClick={() => onPageChange(currentPage + 1)}>
              {currentPage + 1}
            </Button>
          )}

          {currentPage + 1 < totalPages && (
            <Button onClick={() => onPageChange(currentPage + 2)}>
              {currentPage + 2}
            </Button>
          )}

          {currentPage + 2 < totalPages && (
            <Button
              onClick={() => {
                const pageInput = prompt(
                  `Enter page number (1-${totalPages}):`
                );
                if (pageInput) {
                  const pageNum = parseInt(pageInput);
                  if (pageNum >= 1 && pageNum <= totalPages) {
                    onPageChange(pageNum);
                  } else {
                    alert(`Please enter a number between 1 and ${totalPages}`);
                  }
                }
              }}
            >
              ...
            </Button>
          )}

          {totalPages > 1 && (
            <Button onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          )}
        </>
      )}

      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </Container>
  );
};
