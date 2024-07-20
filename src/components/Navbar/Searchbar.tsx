import { useState, useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGlobalSearch } from "@/redux/reducers/searchSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import { updateRecentlySearched } from "@/redux/reducers/coinSlice";
import Image from "next/image";
import useKeyPress from "@/custom-hooks/useKeyPress";

const NavSearch = () => {
  const navSearchRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);
  const { recentlysearched } = useAppSelector((state: any) => state.coins);

  useOnClickOutside(navSearchRef, () => {
    setIsNavSearchOpen(false);
  });

  const enterKeyPressed = useKeyPress("Enter");

  useEffect(() => {
    if (enterKeyPressed) {
      handleSearch();
    }
  }, [enterKeyPressed]);

  const handleSearch = () => {
    setIsSearching(true);
    setIsNavSearchOpen(true);
    dispatch(setGlobalSearch(search));
    dispatch(updateRecentlySearched(search));
  };

  return (
    <div
      className={classNames({
        "relative flex items-center justify-center": true,
        "lg:w-fit mr-1": true,
      })}
      onClick={() => {
        setIsNavSearchOpen(!isNavSearchOpen);
      }}
    >
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          ref={navSearchRef}
          type="text"
          id="table-search"
          autoComplete="off"
          className={classNames({
            "block p-2 pl-10 w-full min-w-[30rem] bg-white": true, //display, padding, width and bg styling
            "text-sm text-neutral-800 outline-none": true, //text styling
            "border border-gray-300 rounded-lg": true, //border styling
            "focus:ring-2 focus:ring-neutral-700 focus:border-neutral-800":
              true, //on focus styling
            "dark:bg-neutral-800 dark:border-neutral-600": true, // bg and border (dark) stylings
            "dark:placeholder-gray-400 dark:text-white": true, //text (dark) styling
            "cursor-text": true,
          })}
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            let searchText = e.currentTarget.value;
            setSearch(searchText);
          }}
        />
        <button
          className={classNames({
            "absolute inset-y-[2px] translate-y-[1px] right-0 grid place-items-center px-3 py-1.5 rounded-md h-fit mr-[3px]":
              true,
            "bg-neutral-600 text-white text-sm": true,
          })}
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {"Search"}
        </button>
        <div
          className={classNames({
            "flex flex-col justify-start items-start": true,
            "z-[1000001] bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-700":
              true,
            "absolute top-[2.75rem] right-0": true,
            "shadow-xl transition-all overflow-y-scroll no-scrollbar": true, //animations
            "h-0 py-0": !isNavSearchOpen,
            "w-full max-h-[15rem]": isNavSearchOpen,
          })}
        >
          {isSearching ? (
            <div className="flex flex-col gap-4 items-center justify-center h-[20rem] w-full bg-neutral-300 dark:bg-neutral-700 bg-opacity-80 z-[100000] overflow-hidden">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-700 dark:border-neutral-300" />
            </div>
          ) : recentlysearched.length > 0 ? (
            <>
              {typeof recentlysearched !== "undefined" &&
                recentlysearched.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      data-value={item}
                      className={classNames({
                        "text-neutral-800 hover:bg-neutral-700 hover:text-white":
                          true, //colors
                        "dark:text-white dark:hover:bg-neutral-300 dark:hover:text-neutral-800":
                          true, //colors (dark)
                        "flex gap-4 items-center w-full": true, //layout
                        "transition-all duration-300": true, //animation
                        "rounded-md mx-2": true, //self style
                        "cursor-pointer": true,
                        "py-0 px-2": true,
                        "flex items-center justify-start": true, //layout
                        "!border-none !outline-none": true,
                        hidden: !isNavSearchOpen,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setGlobalSearch(item));
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
            </>
          ) : (
            <div className="w-full h-[20rem] bg-neutral-300 dark:bg-neutral-700 overflow-clip pt-3">
              <div className="w-full h-full flex flex-col justify-start items-center gap-3 relative">
                <Image
                  priority={true}
                  height={400}
                  width={400}
                  alt={"NotFound"}
                  src="/bw-nf.png"
                  className={classNames({
                    "brightness-[40%] dark:brightness-100 object-contain h-1/2 shrink-0":
                      true,
                  })}
                />
                <div className="relative flex flex-col justify-center items-center gap-2 mobile:gap-1">
                  <h4 className="rubik text-primary font-bold text-xl text-center">
                    {"No Results Found!..."}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavSearch;
