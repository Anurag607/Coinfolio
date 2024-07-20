import { useEffect, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setCoinData,
  setSelectedCoin,
  updateRecentlyViewed,
  updateWatchlist,
} from "@/redux/reducers/coinSlice";
import SortArrows from "./SortArrows";
import RankImage from "./RankImage";
import sortData from "@/scripts/sortingScript";
import { setCurrentSection } from "@/redux/reducers/sectionSlice";
import Image from "next/image";
import DraggableCoin from "./DraggableCoin";
import DroppableTable from "./DroppableTable";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { CoinFetcher } from "@/scripts/fetchScript";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

const Table = ({
  type,
  page,
  setPage,
  data,
  setPageData,
}: {
  type: string;
  page: number;
  setPage: any;
  data: any[];
  setPageData: any;
}) => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state: any) => state.searchBar);
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const {
    coinData,
    watchlist,
    backupData,
    sort_market_cap,
    sort_current_price,
  } = useAppSelector((state: any) => state.coins);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!backupData.hasOwnProperty(page)) return;
    let filteredData = backupData[page].filter((coin: any) => {
      return coin.name.toLowerCase().includes(searchParams.toLowerCase());
    });
    if (searchParams === "") filteredData = backupData[page];
    setPageData(filteredData);
    setCoinData({ page, data: filteredData });
  }, [searchParams]);

  const fetchData = async () => {
    if (coinData.hasOwnProperty(page)) {
      setPageData(coinData[page]);
      return;
    }

    setLoading(true);

    const newData = await CoinFetcher(page);
    setPageData(newData);

    dispatch(setCoinData({ page, data: newData }));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div
      className={classNames({
        "relative shadow-[0px_0px_10px_0px_#c5c5c5] dark:shadow-[0px_0px_0px_0px_#333333] sm:rounded-lg":
          true,
        [`${type === "primary" ? "h-[66.5vh]" : "h-[32vh]"} w-full`]: true,
        "overflow-y-scroll dark:bg-neutral-800": true,
        "ml-4": isSidebarOpen && type === "primary",
      })}
    >
      {type !== "primary" && (
        <h3 className="w-full h-fit py-3 px-6 font-bold text-primary bg-neutral-200 dark:bg-neutral-700">
          {type === "watchlist" ? "Watch List" : "Recently Viewed"}
        </h3>
      )}
      {loading && type === "primary" ? (
        <div className="flex justify-center items-center h-full">
          <Image
            width={24}
            height={24}
            alt={"Loading..."}
            className="h-6"
            src="https://i.gifer.com/VAyR.gif"
          />
        </div>
      ) : (
        <table
          className={`w-full ${
            data.length === 0 ? "h-full" : "h-fit max-h-full"
          } rounded-lg table-auto text-sm text-left text-neutral-500 dark:text-neutral-400`}
        >
          <thead
            className={classNames({
              "w-full relative text-xs text-neutral-700 uppercase": true,
              "border-b rounded-lg": true,
              "dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700":
                true,
            })}
          >
            <tr>
              <th scope="col" className="px-3 py-3 text-center">
                Rank
              </th>
              <th scope="col" className="px-3 py-3">
                {"Name (Symbol)"}
              </th>
              {type === "primary" && (
                <th scope="col" className="px-3 py-3 whitespace-nowrap">
                  {"24H Price Change"}
                </th>
              )}
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center justify-center text-right">
                  Current Price
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      let sortedData = sortData(
                        coinData[page],
                        sort_current_price,
                        "current_price",
                        dispatch
                      );
                      setPageData(sortedData);
                    }}
                  >
                    <SortArrows />
                  </div>
                </div>
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center justify-center text-right">
                  Market Cap
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      let sortedData = sortData(
                        coinData[page],
                        sort_market_cap,
                        "market_cap",
                        dispatch
                      );
                      setPageData(sortedData);
                    }}
                  >
                    <SortArrows />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <DroppableTable className="w-full h-full relative" type={type}>
            {data.length > 0 ? (
              <>
                {data.map((coin: any, i: number) => {
                  const isWatched = watchlist.some(
                    (watchedCoin: any) => watchedCoin.id === coin.id
                  );
                  return (
                    <DraggableCoin
                      key={i}
                      coin={coin}
                      className={classNames({
                        "w-full relative h-fit": true,
                        "cursor-pointer group  dark:bg-neutral-800 dark:border-neutral-700":
                          true,
                        "border-b hover:border-b-2 hover:border-neutral-300":
                          true,
                      })}
                    >
                      <td
                        scope={"col"}
                        className="cursor-pointer px-3 py-4 w-[15%]"
                      >
                        <RankImage imageURL={coin.image} rank={i + 1} />
                      </td>
                      <td
                        scope={"col"}
                        className={`cursor-pointer group-hover:scale-105 pl-3 py-4 font-medium text-neutral-900 dark:text-white w-fit`}
                      >
                        <div className="cursor-pointer flex items-center gap-x-2">
                          <p className="cursor-pointer">{`${
                            coin.name
                          } (${coin.symbol.toUpperCase()})`}</p>
                          <div className="relative">
                            <Image
                              src="/eye.svg"
                              alt="eye"
                              width={16}
                              height={16}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                dispatch(updateWatchlist(coin));
                              }}
                              className={classNames({
                                "opacity-50 dark:invert object-contain h-1/2 shrink-0 hover:opacity-100 hover:scale-110 cursor-pointer":
                                  true,
                              })}
                            />
                            {isWatched && (
                              <div className="absolute top-1/2 left-0 -rotate-45 w-full h-[1.5px] bg-neutral-600" />
                            )}
                          </div>
                        </div>
                        <button
                          className={classNames({
                            "cursor-pointer font-semibold text-xs transition-all mt-1 scale-90":
                              true,
                            "px-3 py-1": true,
                            "bg-neutral-700 text-white": true,
                            "dark:bg-neutral-300 dark:text-neutral-700": true,
                            "hover:bg-white hover:text-neutral-700": true,
                            "dark:hover:bg-neutral-800 dark:hover:text-neutral-200":
                              true,
                            "rounded-full border border-neutral-700 dark:border-neutral-300":
                              true,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(updateRecentlyViewed(coin));
                            dispatch(setSelectedCoin(coin.id));
                            dispatch(setCurrentSection(2));
                          }}
                        >
                          View More
                        </button>
                      </td>
                      {type === "primary" && (
                        <td
                          scope={"col"}
                          className={`cursor-pointer px-3 py-3 ${
                            coin.price_change_percentage_24h < 0
                              ? "text-red-500"
                              : "text-emerald-600"
                          } font-semibold text-center group-hover:scale-105`}
                          onClick={() => console.log(data)}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      )}
                      <td
                        scope={"col"}
                        className="cursor-pointer px-3 py-4 w-[20%] text-center group-hover:scale-105"
                      >
                        ${formatCurrency(coin.current_price)}
                      </td>
                      <td
                        scope={"col"}
                        className="cursor-pointer px-3 py-4 w-[20%] text-center group-hover:scale-105"
                      >
                        ${formatCurrency(coin.market_cap)}
                      </td>
                    </DraggableCoin>
                  );
                })}
              </>
            ) : (
              <tr className="w-full h-full bg-neutral-300 dark:bg-neutral-700 absolute top-0 left-0 overflow-clip pb-12">
                <td className="w-full h-full flex flex-col justify-center items-center gap-3 relative">
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
                      {type === "primary"
                        ? "No Data Found!..."
                        : type === "watchlist"
                        ? "Your Watchlist is Empty!"
                        : "You haven't viewed any coins yet!"}
                    </h4>
                  </div>
                </td>
              </tr>
            )}
          </DroppableTable>
          {type === "primary" && data.length >= 20 && (
            <tfoot>
              <tr>
                <td colSpan={5} className="p-4">
                  <div className="flex justify-between">
                    <button
                      className={`${
                        page === 1 && "pointer-events-none opacity-50"
                      } px-4 py-2 bg-neutral-700 text-white rounded`}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev: number) => Math.max(prev - 1, 1));
                      }}
                      disabled={page === 1}
                    >
                      <CaretLeftFilled />
                    </button>
                    <button
                      className={`${
                        page === 100 && "pointer-events-none opacity-50"
                      } px-4 py-2 bg-neutral-700 text-white rounded`}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev: number) => Math.min(prev + 1, 100));
                      }}
                      disabled={page === 100}
                    >
                      <CaretRightFilled />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      )}
    </div>
  );
};

export default Table;
