import { useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCoinData, setSelectedCoin } from "@/redux/reducers/coinSlice";
import SortArrows from "./SortArrows";
import RankImage from "./RankImage";
import sortData from "@/scipts/sortingScript";
import { setCurrentSection } from "@/redux/reducers/sectionSlice";

const Table = ({
  currentData,
  RefereshCoinDetails,
}: {
  currentData: any[];
  RefereshCoinDetails: any;
}) => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state: any) => state.searchBar);
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const { backupData, sort_market_cap, sort_current_price } = useAppSelector(
    (state: any) => state.coins
  );

  useEffect(() => {
    let filteredData = currentData.filter((coin: any) => {
      return coin.name.toLowerCase().includes(searchParams.toLowerCase());
    });
    if (searchParams === "") filteredData = backupData;
    dispatch(setCoinData(filteredData));
  }, [searchParams]);

  return (
    <div
      className={classNames({
        "relative shadow-md sm:rounded-lg": true,
        "flex items-start justify-center": true,
        "h-[66.5vh] w-full": true,
        "pl-12": isSidebarOpen,
        "pl-0": !isSidebarOpen,
        "overflow-y-scroll overflow-x-auto": true,
        "hover:table-fixed": true,
      })}
    >
      <table className="w-full rounded-lg overflow-x-auto table-auto text-sm text-left text-neutral-500 dark:text-neutral-400 scroll-m-2">
        <thead
          className={classNames({
            "text-xs text-neutral-700 uppercase": true,
            "border-b": true,
            "dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700":
              true,
            "rounded-lg": true,
          })}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
            <th scope="col" className="px-6 py-3">
              {"Name (Symbol)"}
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Current Price
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    let sortedData = sortData(
                      currentData,
                      sort_current_price,
                      "current_price",
                      dispatch
                    );
                    dispatch(setCoinData(sortedData));
                  }}
                >
                  <SortArrows />
                </div>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Market Cap
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    let sortedData = sortData(
                      currentData,
                      sort_market_cap,
                      "market_cap",
                      dispatch
                    );
                    dispatch(setCoinData(sortedData));
                  }}
                >
                  <SortArrows />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((coin: any, i: number) => {
            return (
              <tr
                key={i}
                className="border-b dark:bg-neutral-800 dark:border-neutral-700 w-full relative"
              >
                <td className="px-6 py-4 w-[15%]">
                  <RankImage imageURL={coin.image} rank={i + 1} />
                </td>
                <th
                  scope="row"
                  onClick={(e) => {
                    e.preventDefault();
                    RefereshCoinDetails();
                    dispatch(setSelectedCoin(coin.id));
                    dispatch(setCurrentSection(1));
                  }}
                  className="pl-6 py-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap w-[45%] cursor-pointer"
                >
                  {coin.name} ({coin.symbol})
                </th>
                <td className="px-6 py-4 w-[20%]">${coin.current_price}</td>
                <td className="px-6 py-4 w-[20%]">${coin.market_cap}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
