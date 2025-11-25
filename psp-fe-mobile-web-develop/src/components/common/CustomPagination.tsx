import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";

type PaginationProps = {
  // page index
  pageNumber: number; // This should represent the current page, starting from 1
  // total page length
  totalPages?: number;
  onClick: (page: number) => any;
};

const CustomPagination = ({
  totalPages = 0,
  onClick,
  pageNumber
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const checkedPageNum = useMemo(() => {
    if (typeof pageNumber === "string" || typeof pageNumber === "number") {
      return Number(pageNumber);
    }

    const searchParamsPageNumber = searchParams.get("page");
    if (!!searchParamsPageNumber) {
      return Number(searchParamsPageNumber);
    }

    return 1;
  }, [searchParams, pageNumber]);

  const currentPage = Math.max(checkedPageNum, 1);
  const startPage = Math.floor((currentPage - 1) / 5) * 5; // 페이지 인덱스를 5단위로 설정
  const endPage = Math.min(startPage + 4, totalPages - 1);

  const handlePageChanged = (pageNumberParam: number) => {
    onClick(pageNumberParam);
    console.log("click");
  };

  return totalPages ? (
    <Pagination className="mt-[45px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            pageNumber={currentPage}
            size="icon"
            onClick={() => handlePageChanged(Math.max(currentPage - 1, 0))}
          />
        </PaginationItem>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                size="icon"
                onClick={() => handlePageChanged(page)}
                className={page === currentPage ? "bg-blue-500 text-white" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            pageNumber={currentPage}
            totalPages={totalPages}
            size="icon"
            onClick={() =>
              handlePageChanged(Math.min(currentPage + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
};

export default CustomPagination;
