"use client";

import { useState, useEffect } from "react";
import DashboardPage from "@/Pages/Dashboard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CoinChart, FAB, Filter, Pagination, Search } from "@/components";
import classNames from "classnames";
import Image from "next/image";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";
import { closeSidebar, openSidebar } from "@/redux/reducers/sidebarSlice";
import { clearFilterValue, closeFilter } from "@/redux/reducers/filterSlice";
import { CaretLeftOutlined, CaretUpOutlined } from "@ant-design/icons";
import useSwipe from "@/custom-hooks/useSwipe";
import { clearSearchParams } from "@/redux/reducers/searchSlice";
import filterData from "@/scripts/filterScript";
import { CategoryFetcher, CoinFetcher } from "@/scripts/fetchScript";
import { toast } from "react-toastify";
import { ToastConfig } from "@/utils/config";
import { setCoinData } from "@/redux/reducers/coinSlice";
import Table from "@/components/shared/Table";

export default function Page() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { currentSection } = useAppSelector((state: any) => state.section);
  const { coinData, backupData, categoryData } = useAppSelector(
    (state: any) => state.coins
  );
  const { searchParams } = useAppSelector((state: any) => state.searchBar);
  const { filterValue } = useAppSelector((state: any) => state.filter);

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      dispatch(closeSidebar());
    },
    onSwipedRight: () => {
      dispatch(openSidebar());
    },
  });

  const cleanup = () => {
    dispatch(closeSidebar());
    dispatch(closeFilter());
    dispatch(setShowSidebar([false, ""]));
    dispatch(setShowBottomBar([false, ""]));
    dispatch(clearSearchParams());
    dispatch(clearFilterValue());
    console.clear();
  };

  const getCoinData = async () => {
    if (coinData.length > 0) return;
    setIsLoading(true);
    CoinFetcher(dispatch)
      .then((res: any) => {
        if (!res || typeof res === "undefined") {
          toast.error("Failed to fetch data", ToastConfig);
          setIsLoading(false);
        } else if (res.length === 0) {
          toast.error("Failed to fetch data", ToastConfig);
          setIsLoading(false);
        } else {
          dispatch(setCoinData(backupData));
          if (categoryData.length === 0) {
            try {
              CategoryFetcher(dispatch).then((res: any) => {
                console.log("Categories: ", res);
                setIsLoading(false);
              });
            } catch (err) {
              setIsLoading(false);
              toast.error("Failed to fetch data", ToastConfig);
            }
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Failed to fetch data", ToastConfig);
      });
  };

  useEffect(() => {
    getCoinData();
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
  }, [filterValue, searchParams]);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex flex-col gap-4 items-center justify-center h-screen w-screen bg-zinc-800 bg-opacity-80 z-[100000] overflow-hidden">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main" />
        <h4 className="text-main font-bold text-2xl mobile:w-[15rem] text-center">{`Getting Latest Crypto Currency Data...`}</h4>
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
            <>
              <div
                className={classNames({
                  "h-[8vh] w-full ml-10 z-[10000] relative": true,
                  "flex items-center justify-start": true,
                  "filter-search-bar:justify-start": true,
                  "filter-search-bar:ml-14": true,
                  "mobile:-translate-x-5": true,
                })}
              >
                <Search />
                <div className="h-full w-[0.5rem]" />
                <Filter />
              </div>
              <Table />
              <FAB />
            </>
          ) : (
            <CoinChart />
          )}
        </DashboardPage>
      )}
      {/* <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "mobile:w-[32px] mobile:h-[32px] w-[42px] h-[42px] mobile:hidden flex items-center justify-center":
            true,
          [`bg-primary text-main mobile:text-[0.95rem] text-3xl rounded-l-lg`]:
            true,
          "z-[100001] transition-all": true,
          "fixed right-0 top-[20%]": true,
        })}
      >
        <CaretLeftOutlined />
      </div>
      <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "mobile:w-[32px] mobile:h-[32px] w-[42px] h-[42px] hidden mobile:flex items-center justify-center":
            true,
          [`bg-primary text-main mobile:text-[0.95rem] text-xl rounded-t-lg`]:
            true,
          "z-[100001] transition-all": true,
          "fixed bottom-0 left-[15%]": true,
        })}
      >
        <CaretUpOutlined />
      </div> */}
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
