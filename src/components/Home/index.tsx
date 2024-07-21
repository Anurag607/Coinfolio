import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import HomeTable from "./HomeTable";
import { CompanyFetcher } from "@/scripts/fetchScript";
import { setHoldingData } from "@/redux/reducers/coinSlice";
import Image from "next/image";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const options = {
  chart: {
    type: "line",
    curve: "smooth",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#737373"],
  fill: {
    colors: ["#37474f"],
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        if (val > 1000000000000000)
          return (val / 1000000000000000).toFixed(2) + "Q";
        if (val > 1000000000000) return (val / 1000000000000).toFixed(2) + "T";
        if (val > 1000000000) return (val / 1000000000).toFixed(2) + "B";
        if (val > 1000000) return (val / 1000000).toFixed(2) + "M";
        if (val > 1000) return (val / 1000).toFixed(2) + "K";

        return val.toFixed(2);
      },
    },
  },
} as any;

const Home = () => {
  const dispatch = useAppDispatch();
  const [isLoadingHoldings, setIsLoadingHoldings] = useState(false);
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const [currentParams, setCurrentParams] = useState("market_cap");
  const [currentCoin, setCurrentCoin] = useState("bitcoin");
  const { holdingData, globalData } = useAppSelector(
    (state: any) => state.coins
  );

  const [series, setSeries] = useState<{ name: string; data: any }[]>([]);

  useEffect(() => {
    if (!globalData || typeof globalData === "undefined") return;
    if (Object.keys(globalData).length === 0) return;

    if (
      !globalData.hasOwnProperty("total_market_cap") ||
      !globalData.hasOwnProperty("total_volume")
    )
      return;

    let seriesData: any = [];
    let categories: any = [];
    if (currentParams === "market_cap") {
      Object.keys(globalData.total_market_cap).forEach((key: string) => {
        categories.push(key);
        seriesData.push(globalData.total_market_cap[key]);
      });
    } else if (currentParams === "total_volume") {
      Object.keys(globalData.total_volume).forEach((key: string) => {
        categories.push(key);
        seriesData.push(globalData.total_volume[key]);
      });
    }
    setSeries([
      {
        name: capitalize(currentParams.split("_").join(" ")),
        data: seriesData,
      },
    ]);
    options.xaxis.categories = categories;
  }, [globalData, currentParams]);

  return (
    <div
      className={classNames({
        "w-[99%] h-full relative flex flex-col items-start justify-start gap-y-8 mt-0":
          true,
        "pr-4 overflow-scroll no-scrollbar": true,
        "pl-12": isSidebarOpen,
        "pl-0": !isSidebarOpen,
      })}
    >
      {/* Chart */}
      <div className="flex flex-col items-center justify-center gap-y-4 relative w-full rounded-md dark:!text-white py-4">
        <div className="bound text-2xl font-medium mb-4 w-full relative text-neutral-700 dark:text-white">
          <div className="flex items-center justify-start gap-x-3">
            {`Global Market Data`}
            {isLoadingHoldings ? (
              <Image
                width={24}
                height={24}
                alt={"Loading..."}
                className="h-6"
                src="https://i.gifer.com/VAyR.gif"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="w-3/4 h-[1px] bg-neutral-700 dark:bg-white" />
          <div className="w-full flex items-center justify-start gap-x-4 mt-3 ml-1">
            {["market_cap", "total_volume"].map(
              (param: string, index: number) => {
                return (
                  <button
                    key={index}
                    className={classNames({
                      "w-fit cursor-pointer text-xs capitalize": true,
                      "hover:scale-105 transition-all": true,
                      "py-[0.25rem] px-[1rem] rounded-full": true,
                      "border-2 border-zinc-200 dark:border-neutral-600": true,
                      "flex items-center justify-between": true,
                      "bg-white text-neutral-700 dark:bg-neutral-700 dark:text-white":
                        currentParams !== param,
                      "bg-neutral-700 text-white dark:text-neutral-700 dark:bg-neutral-200":
                        currentParams === param,
                    })}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentParams(param);
                    }}
                  >
                    {param.split("_").join(" ")}
                  </button>
                );
              }
            )}
          </div>
        </div>
        <div className="w-full dark:bg-neutral-800 py-5 rounded-md dark:!text-white">
          <Chart
            options={options}
            series={series}
            type="area"
            width={"99%"}
            height={400}
            curve={"smooth"}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full relative gap-y-3">
        <div className="bound text-2xl font-medium mb-4 w-full relative text-neutral-700 dark:text-white">
          <div className="flex items-center justify-start gap-x-3 ">
            {`Company Holdings`}
            {isLoadingHoldings ? (
              <Image
                width={24}
                height={24}
                alt={"Loading..."}
                className="h-6"
                src="https://i.gifer.com/VAyR.gif"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="w-3/4 h-[1px] bg-neutral-700 dark:bg-white" />
          <div className="w-full flex items-center justify-start gap-x-4 mt-3 ml-1">
            {["bitcoin", "ethereum"].map((coin: string, index: number) => {
              return (
                <button
                  key={index}
                  className={classNames({
                    "w-fit cursor-pointer text-xs capitalize": true,
                    "hover:scale-105 transition-all": true,
                    "py-[0.25rem] px-[1rem] rounded-full": true,
                    "border-2 border-zinc-200 dark:border-neutral-600": true,
                    "flex items-center justify-between": true,
                    "bg-white text-neutral-700 dark:bg-neutral-700 dark:text-white":
                      currentCoin !== coin,
                    "bg-neutral-700 text-white dark:text-neutral-700 dark:bg-neutral-200":
                      currentCoin === coin,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoadingHoldings(true);
                    setCurrentCoin(coin);
                    CompanyFetcher(coin).then((data) => {
                      dispatch(setHoldingData(data));
                      setIsLoadingHoldings(false);
                    });
                  }}
                >
                  {coin}
                </button>
              );
            })}
          </div>
        </div>
        {typeof holdingData !== "undefined" && <HomeTable data={holdingData} />}
        <div className={"w-full h-[8rem] bg-transparent"} />
      </div>
    </div>
  );
};

export default Home;
