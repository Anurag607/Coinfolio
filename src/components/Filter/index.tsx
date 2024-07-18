import React from "react";
import classNames from "classnames";
import {
  openFilter,
  closeFilter,
  setFilterValue,
} from "@/redux/reducers/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { setCoinData } from "@/redux/reducers/coinSlice";
import { FilterOutlined } from "@ant-design/icons";
import filterData from "@/scripts/filterScript";

const Filter = () => {
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  const { isFilterOpen } = useAppSelector((state: any) => state.filter);
  const { coinData, backupData, categoryData } = useAppSelector(
    (state: any) => state.coins
  );

  useOnClickOutside(ref, () => {
    dispatch(closeFilter());
  });

  const ClickEventHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    filterData(coinData, backupData, target.dataset.value!, dispatch);
    dispatch(closeFilter());
  };

  return (
    <div
      ref={ref}
      className={classNames({
        "relative flex items-center justify-center": true,
        "cursor-pointer": true,
      })}
      onClick={() => {
        !isFilterOpen ? dispatch(openFilter()) : dispatch(closeFilter());
      }}
    >
      <button
        className={classNames({
          "cursor-pointer grid place-content-center": true,
          "bg-white": true,
          "py-[0.5rem] px-[0.5rem] rounded-md": true,
          "border-2 border-zinc-200": true,
          "mt-1": true,
        })}
      >
        <FilterOutlined />
      </button>
      <div
        className={classNames({
          "flex flex-col justify-start items-start pr-2.5 overflow-hidden":
            true,
          "z-[1000001] bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-700":
            true,
          "absolute top-[2.75rem] right-2": true,
          "shadow-xl transition-all overflow-y-scroll no-scrollbar": true, //animations
          "w-0 py-0": !isFilterOpen,
          "max-h-[20rem]": isFilterOpen,
        })}
      >
        <li
          className={classNames({
            "bg-primary text-main": true, //colors
            "flex gap-4 items-center justify-center w-[92.5%]": true, //layout
            "transition-colors duration-300": true, //animation
            "rounded-md p-2 mx-2 mb-2": true, //self style
            "cursor-pointer": true,
            "py-1 my-1": true,
            "flex items-center justify-start": true, //layout
            hidden: !isFilterOpen,
          })}
          onClick={() => {
            dispatch(setFilterValue(""));
            dispatch(setCoinData(backupData));
            dispatch(closeFilter());
          }}
        >
          {"Clear"}
        </li>
        {categoryData.map((item: any, index: number) => {
          return (
            <li
              key={index}
              data-value={item.category_id}
              className={classNames({
                "text-neutral-800 hover:bg-neutral-700 hover:text-white": true, //colors
                "dark:text-white dark:hover:bg-neutral-300 dark:hover:text-neutral-800":
                  true, //colors (dark)
                "flex gap-4 items-center w-full": true, //layout
                "transition-all duration-300": true, //animation
                "rounded-md p-2 mx-2": true, //self style
                "cursor-pointer": true,
                "py-1": true,
                "flex items-center justify-start": true, //layout
                "!border-none !outline-none": true,
                hidden: !isFilterOpen,
              })}
              onClick={ClickEventHandler}
            >
              {item.name}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
