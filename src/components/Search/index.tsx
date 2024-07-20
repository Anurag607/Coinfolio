import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchParams } from "@/redux/reducers/searchSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState } from "react";
import { updateRecentlySearched } from "@/redux/reducers/coinSlice";

const Search = () => {
  const searchRef = useRef(null);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { recentlysearched } = useAppSelector((state: any) => state.coins);

  useOnClickOutside(searchRef, () => {
    dispatch(updateRecentlySearched(search));
    setIsSearchOpen(false);
  });

  return (
    <div
      className={classNames({
        "relative flex items-center justify-center": true,
        "lg:w-fit mr-1": true,
      })}
      onClick={() => {
        setIsSearchOpen(!isSearchOpen);
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
          ref={searchRef}
          type="text"
          id="table-search"
          autoComplete="off"
          className={classNames({
            "block p-2 pl-10 w-full min-w-[20rem] bg-white": true, //display, padding, width and bg styling
            "text-sm text-neutral-800 outline-none": true, //text styling
            "border border-gray-300 rounded-lg": true, //border styling
            "focus:ring-2 focus:ring-neutral-700 focus:border-neutral-800":
              true, //on focus styling
            "dark:bg-neutral-800 dark:border-neutral-600": true, // bg and border (dark) stylings
            "dark:placeholder-gray-400 dark:text-white": true, //text (dark) styling
            "cursor-text": true,
          })}
          placeholder="Search for Coins"
          value={search}
          onChange={(e) => {
            let searchText = e.currentTarget.value;
            setSearch(searchText);
            dispatch(setSearchParams(search));
          }}
        />
        <div
          className={classNames({
            "flex flex-col justify-start items-start pr-2.5": true,
            "z-[1000001] bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-700":
              true,
            "absolute top-[2.75rem] right-0": true,
            "shadow-xl transition-all overflow-y-scroll no-scrollbar": true, //animations
            "h-0 py-0": !isSearchOpen,
            "w-full max-h-[15rem]": isSearchOpen,
          })}
        >
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
                    "rounded-md p-2 mx-2": true, //self style
                    "cursor-pointer": true,
                    "py-1": true,
                    "flex items-center justify-start": true, //layout
                    "!border-none !outline-none": true,
                    hidden: !isSearchOpen,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSearchParams(item));
                  }}
                >
                  {item}
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Search;
