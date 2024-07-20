"use client";

import { useState, useEffect } from "react";
import DashboardPage from "@/Pages/Dashboard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CoinChart, Filter, Home, Search } from "@/components";
import classNames from "classnames";
import Image from "next/image";
import { closeSidebar, openSidebar } from "@/redux/reducers/sidebarSlice";
import useSwipe from "@/custom-hooks/useSwipe";
import filterData from "@/scripts/filterScript";
import {
  CategoryFetcher,
  CoinChartDataFetcher,
  CoinDetailFetcher,
  CoinFetcher,
  CoinListFetcher,
  CompanyFetcher,
  GlobalDataFetcher,
} from "@/scripts/fetchScript";
import { toast } from "react-toastify";
import { ToastConfig } from "@/utils/config";
import Table from "@/components/shared/Table";
import {
  setCoinList,
  setCurrentData,
  setGlobalData,
  setHoldingData,
  setSelectedCoin,
  setSelectedCoinData,
} from "@/redux/reducers/coinSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { currentSection } = useAppSelector((state: any) => state.section);
  const {
    currentData,
    selectedCoin,
    coinData,
    watchlist,
    recentlyViewed,
    backupData,
    categoryData,
  } = useAppSelector((state: any) => state.coins);
  const { searchParams } = useAppSelector((state: any) => state.searchBar);
  const { filterValue } = useAppSelector((state: any) => state.filter);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   console.log("Current Data: ", currentData);
  //   console.log("Category Data: ", categoryData);
  // }, [currentData, categoryData]);

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      dispatch(closeSidebar());
    },
    onSwipedRight: () => {
      dispatch(openSidebar());
    },
  });

  const RefereshCoinDetails = () => {
    if (process.env.NEXT_PUBLIC_STATIC_API === "true") return;
    setIsFetching(true);
    CoinChartDataFetcher(selectedCoin)
      .then((res) => {
        if (res.hasOwnProperty("prices")) {
          CoinDetailFetcher(selectedCoin)
            .then((data) => {
              if (data.hasOwnProperty("id")) {
                dispatch(setSelectedCoinData({ ...res, ...data }));
                setIsFetching(false);
              } else {
                setIsFetching(false);
              }
            })
            .catch((err) => {
              toast.error(
                `Failed to fetch data (CoinDetail-API-${err})`,
                ToastConfig
              );
              setIsFetching(false);
            });
          setIsFetching(false);
        } else {
          setIsFetching(false);
        }
      })
      .catch((err) => {
        toast.error(`Failed to fetch data (Chart-API-${err})`, ToastConfig);
        setIsFetching(false);
      });
  };

  const getCoinData = async () => {
    if (process.env.NEXT_PUBLIC_STATIC_API === "true") return;
    setIsLoading(true);

    CoinFetcher(dispatch, page, []).then((res: any) => {
      dispatch(setSelectedCoin("bitcoin"));
      dispatch(setCurrentData({ currentDataId: "All Coins", data: res }));
      CategoryFetcher(dispatch).then((res: any) => {
        CompanyFetcher("bitcoin").then((res) => {
          dispatch(setHoldingData(res));
          GlobalDataFetcher().then((res) => {
            dispatch(setGlobalData(res));
            setIsLoading(false);
          });
        });
      });
    });
  };

  useEffect(() => {
    RefereshCoinDetails();
  }, [selectedCoin]);

  useEffect(() => {
    getCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isSearchEmpty = () => searchParams.length === 0;
    const isFilterEmpty = () => filterValue.length === 0;
    const isClear = () => isSearchEmpty() && isFilterEmpty();

    if (isClear()) {
      return;
    }
    filterData(
      isFilterEmpty() ? backupData : coinData,
      searchParams,
      filterValue,
      dispatch
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, searchParams]);

  const CoinDataLists: { [key: string]: any } = {
    "All Coins": coinData,
    "Watch List": watchlist,
    "Recently Viewed": recentlyViewed,
  };

  if (isLoading || isFetching) {
    return (
      <div className="fixed top-0 left-0 flex flex-col gap-4 items-center justify-center h-screen w-screen bg-zinc-800 bg-opacity-80 z-[100000] overflow-hidden">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
        <h4 className="text-white font-bold text-2xl mobile:w-[15rem] text-center">{`Getting Latest Crypto Currency Data...`}</h4>
      </div>
    );
  }

  return (
    <main className={"h-full w-full relative"} {...swipeHandlers}>
      {coinData === undefined ? (
        <NotFound />
      ) : (
        <DashboardPage>
          {currentSection === 0 ? (
            <Home />
          ) : currentSection === 1 ? (
            <>
              <div
                className={classNames({
                  "relative w-full flex flex-col items-center justify-start":
                    true,
                  "filter-search-bar:justify-start": true,
                  "ml-10 filter-search-bar:ml-14": true,
                  "mobile:-translate-x-5": true,
                })}
              >
                <div
                  className={classNames({
                    "h-fit mb-8 w-full z-[100] relative": true,
                    "flex items-center justify-start": true,
                    "filter-search-bar:ml-14": true,
                  })}
                >
                  <Search />
                  <div className="h-full w-[0.5rem]" />
                  <Filter />
                </div>
                <div className="w-full flex items-center justify-start gap-x-4 pb-8">
                  {Object.keys(CoinDataLists).map(
                    (key: string, index: number) => {
                      return (
                        <button
                          key={index}
                          className={classNames({
                            "w-fit text-xs cursor-pointer": true,
                            "hover:scale-105 transition-all": true,
                            "py-[0.25rem] px-[1rem] rounded-full": true,
                            "border-2 border-zinc-200 dark:border-neutral-600":
                              true,
                            "flex items-center justify-between": true,
                            "bg-white text-neutral-700 dark:bg-neutral-700 dark:text-white":
                              currentData.currentDataId !== key,
                            "bg-neutral-700 text-white dark:text-neutral-700 dark:bg-neutral-200":
                              currentData.currentDataId === key,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              setCurrentData({
                                currentDataId: key,
                                data: CoinDataLists[key],
                              })
                            );
                          }}
                        >
                          {key}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="w-full relative flex flex-row flex-wrap items-start justify-center gap-4 mt-0">
                <div className="w-[60%] h-fit relative flex">
                  <Table
                    type={"primary"}
                    page={page}
                    setPage={setPage}
                    data={
                      currentData.currentDataId === "All Coins"
                        ? coinData
                        : currentData.data
                    }
                    RefereshCoinDetails={() => {
                      RefereshCoinDetails();
                    }}
                  />
                </div>
                <div className="w-[35%] h-fit flex flex-col items-center justify-center gap-y-4">
                  <Table
                    type={"watchlist"}
                    page={page}
                    setPage={setPage}
                    data={watchlist}
                    RefereshCoinDetails={() => {
                      RefereshCoinDetails();
                    }}
                  />
                  <Table
                    type={"recentlyViewed"}
                    page={page}
                    setPage={setPage}
                    data={recentlyViewed}
                    RefereshCoinDetails={() => {
                      RefereshCoinDetails();
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <CoinChart
              RefereshCoinDetails={() => {
                RefereshCoinDetails();
              }}
              isFetching={isFetching}
            />
          )}
        </DashboardPage>
      )}
    </main>
  );
}

const NotFound = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center gap-3 pr-[0rem] sm:pr-[4rem] md:pr-[6rem] mx-auto">
      <Image
        priority={true}
        height={400}
        width={400}
        alt={"NotFound"}
        src="/bw-nf.png"
        className={classNames({
          "brightness-[40%] dark:brightness-100 w-[17.5rem] xl:w-[20rem]": true,
        })}
      />
      <div className="relative flex flex-col justify-center items-center gap-2 mobile:gap-1 mb-[2.5rem]">
        <h4 className="rubik text-primary font-bold text-2xl text-center mobile:text-[1.25rem]">
          Nothing here Yet!...
        </h4>
      </div>
    </div>
  );
};
