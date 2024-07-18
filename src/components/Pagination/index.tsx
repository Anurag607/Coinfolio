import React, { useRef, useState } from "react";
import { PaginationProps } from "@/utils/types";
import classNames from "classnames";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next-nprogress-bar";

const Pagination = ({ data, itemsPerPage }: PaginationProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const sliderRef = useRef(null);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {}, [currentPage]);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="z-[1000] flex flex-col items-start justify-between relative w-full h-full">
      <div className="flex flex-wrap mobile:justify-center items-start justify-start gap-7 w-full relative">
        {paginatedData.map((item, index) => {
          return (
            // Cards...
            <div
              key={index}
              className={classNames({
                "relative mobile-sm:w-[77.5vw] w-[15rem] h-[17.5rem] z-[101]":
                  true,
                "flex flex-col justify-start items-start gap-4": true,
                "rounded-lg shadow-md p-4": true,
              })}
              style={{ backgroundColor: item.color }}
            ></div>
          );
        })}
      </div>
      {/* Pages... */}
      <div className="w-full h-fit flex justify-center mt-4 pb-10 sm:pb-0">
        <button
          disabled={currentPage === 1}
          className={`mx-1 px-2 py-1 rounded-full bg-primary text-main ${
            currentPage === 1 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            handlePageChange(currentPage - 1);
            if (currentPage >= 4) {
              (sliderRef.current as any).scrollLeft -= 33;
            }
          }}
        >
          {"<"}
        </button>
        <div
          ref={sliderRef}
          className={`flex items-center justify-start gap-2 ${
            totalPages >= 3 ? "w-[5.35rem]" : "w-fit"
          } bg-transparent overflow-x-scroll realtive whitespace-nowrap scroll-smooth`}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded-full transition ease-out duration-200 ${
                currentPage === index + 1 ? "bg-primary text-main" : "bg-main"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          className={`mx-1 px-2 py-1 rounded-full bg-primary text-main ${
            currentPage === totalPages ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            handlePageChange(currentPage + 1);
            if (currentPage >= 3) {
              (sliderRef.current as any).scrollLeft += 33;
            }
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
