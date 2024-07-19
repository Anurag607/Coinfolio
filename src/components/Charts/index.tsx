import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { setSelectedCoin } from "@/redux/reducers/coinSlice";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

const options = {
  chart: {
    type: "area",
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
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        if (val > 1000000000) return (val / 1000000000).toFixed(2) + "B";
        if (val > 1000000) return (val / 1000000).toFixed(2) + "M";
        if (val > 1000) return (val / 1000).toFixed(2) + "K";

        return val.toFixed(2);
      },
    },
  },
} as any;

const CoinChart = ({
  RefereshCoinDetails,
  isFetching,
}: {
  RefereshCoinDetails: any;
  isFetching: boolean;
}) => {
  const dispatch = useAppDispatch();
  const chartRef = useRef<HTMLDivElement>(null);
  const [isCoinOpen, setIsCoinOpen] = useState(false);
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const { selectedCoin, selectedCoinData, backupData } = useAppSelector(
    (state: any) => state.coins
  );
  const [currentParams, setCurrentParams] = useState("Prices");
  const [fundamentals, setFundamentals] = useState<{ [key: string]: any }>({});
  const [delta, setDelta] = useState<{ [key: string]: any }>({});
  const [performance, setPerformance] = useState<{ [key: string]: any }[]>([]);
  const [chartParameters, setChartParameters] = useState<{
    [key: string]: any;
  }>({});

  useOnClickOutside(chartRef, () => {
    setIsCoinOpen(false);
  });

  useEffect(() => {
    if (typeof selectedCoinData === "undefined") return;
    if (typeof selectedCoinData.market_data === "undefined") return;
    setFundamentals({
      "Market Cap": selectedCoinData.market_data.market_cap.usd,
      "Fully Diluted Valuation":
        selectedCoinData.market_data.fully_diluted_valuation.usd,
      "Trading Volume": selectedCoinData.market_data.total_volume.usd,
      "Circulating Supply": selectedCoinData.market_data.circulating_supply,
      "Total Supply": selectedCoinData.market_data.total_supply,
      "Max Supply": selectedCoinData.market_data.max_supply,
    });

    setDelta({
      "24h Change": selectedCoinData.market_data.price_change_percentage_24h,
      "7d Change": selectedCoinData.market_data.price_change_percentage_7d,
      "14d Change": selectedCoinData.market_data.price_change_percentage_14d,
      "30d Change": selectedCoinData.market_data.price_change_percentage_30d,
      "200d Change": selectedCoinData.market_data.price_change_percentage_200d,
      "1y Change": selectedCoinData.market_data.price_change_percentage_1y,
      "All Time High": selectedCoinData.market_data.ath.usd,
      "All Time Low": selectedCoinData.market_data.atl.usd,
      "Today's High": selectedCoinData.market_data.high_24h.usd,
      "Today's Low": selectedCoinData.market_data.low_24h.usd,
    });

    setPerformance([
      {
        "Today's Low": selectedCoinData.market_data.low_24h.usd,
        "Today's High": selectedCoinData.market_data.high_24h.usd,
      },
      {
        "All Time Low": selectedCoinData.market_data.atl.usd,
        "All Time High": selectedCoinData.market_data.ath.usd,
      },
    ]);

    setChartParameters({
      Prices: selectedCoinData.prices,
      "Market Cap": selectedCoinData.market_caps,
      "Total Volume": selectedCoinData.total_volumes,
    });
  }, [selectedCoinData]);

  useEffect(() => {
    RefereshCoinDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCoin]);

  const series = [
    {
      name: selectedCoin,
      data: (typeof selectedCoinData === "undefined" || isFetching
        ? []
        : chartParameters.hasOwnProperty(currentParams)
        ? chartParameters[currentParams]
        : []
      ).map((item: any) => ({
        x: new Date(item[0]),
        y: item[1],
      })),
    },
  ];

  return (
    <div
      className={classNames({
        "w-full h-full relatve flex flex-col items-start justify-start gap-y-8":
          true,
        "pl-12": isSidebarOpen,
        "pl-0": !isSidebarOpen,
      })}
    >
      {/* Coin Selector */}
      <div
        ref={chartRef}
        className={classNames({
          "w-full relative flex items-center justify-center": true,
          "cursor-pointer": true,
        })}
        onClick={() => {
          setIsCoinOpen(!isCoinOpen);
        }}
      >
        <button
          className={classNames({
            "w-full cursor-pointer bg-white dark:bg-neutral-700 dark:text-white":
              true,
            "py-[0.5rem] px-[0.5rem] mt-1 rounded-md": true,
            "border-2 border-zinc-200 dark:border-neutral-600": true,
            "flex items-center justify-between": true,
          })}
        >
          <p>{selectedCoin}</p>
          {isFetching ? (
            <Image
              width={24}
              height={24}
              alt={"Loading..."}
              className="h-6"
              src="https://i.gifer.com/VAyR.gif"
            />
          ) : (
            <CaretDownFilled className="text-neutral-500 dark:text-white mr-2" />
          )}
        </button>
        <div
          className={classNames({
            "flex flex-col justify-start items-start pr-2.5 overflow-hidden":
              true,
            "z-[1000001] bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-700":
              true,
            "absolute top-[2.75rem] right-0": true,
            "shadow-xl transition-all overflow-y-scroll no-scrollbar": true, //animations
            "h-0 py-0": !isCoinOpen,
            "w-full max-h-[15rem]": isCoinOpen,
          })}
        >
          {backupData.map((item: any, index: number) => {
            return (
              <li
                key={index}
                data-value={item.id}
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
                  hidden: !isCoinOpen,
                })}
                onClick={(e) => dispatch(setSelectedCoin(item.id))}
              >
                {item.name}
              </li>
            );
          })}
        </div>
      </div>
      {/* Chart */}
      <div className="flex flex-col items-center justify-center gap-y-4 relative w-full dark:bg-neutral-800 rounded-md dark:!text-white py-4">
        <div className="w-full dark:bg-neutral-800 rounded-md dark:!text-white">
          <Chart
            options={options}
            series={series}
            type="area"
            width={"100%"}
            height={400}
            curve={"smooth"}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-x-4">
          {Object.keys(chartParameters).map((key: string, index: number) => {
            return (
              <button
                key={index}
                className={classNames({
                  "w-fit cursor-pointer text-xs": true,
                  "hover:scale-105 transition-all": true,
                  "py-[0.25rem] px-[1rem] rounded-full": true,
                  "border-2 border-zinc-200 dark:border-neutral-600": true,
                  "flex items-center justify-between": true,
                  "bg-white text-neutral-700 dark:bg-neutral-700 dark:text-white":
                    currentParams !== key,
                  "bg-neutral-700 text-white dark:text-neutral-700 dark:bg-neutral-200":
                    currentParams === key,
                })}
                onClick={() => setCurrentParams(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
      {/* Performance Section */}
      {selectedCoinData.hasOwnProperty("id") ? (
        <div className="p-4rounded-lg w-full relative">
          <h2 className="bound text-2xl font-medium mb-4 w-full relative text-neutral-700 dark:text-white">
            {`Performance`}
            <div className="w-3/4 h-[1px] bg-neutral-700 dark:bg-white" />
          </h2>
          <div className=" poppins w-[22rem]">
            {performance.map(
              (metric: { [key: string]: any }, index: number) => {
                let change = 0;
                if (index === 0) {
                  change =
                    (selectedCoinData.market_data.high_24h.usd -
                      selectedCoinData.market_data.low_24h.usd) /
                    100;
                } else {
                  change =
                    (selectedCoinData.market_data.ath.usd -
                      selectedCoinData.market_data.atl.usd) /
                    100;
                }

                change = Math.ceil(change);

                if (change > 100) {
                  let divisor = 100;
                  while (1) {
                    if (change < divisor) {
                      change /= divisor / 10;
                      break;
                    } else {
                      divisor *= 10;
                    }
                  }
                }

                return (
                  <div
                    key={index}
                    className="w-full flex justify-between mb-2 tracking-tighter"
                  >
                    {Object.keys(metric).map((key: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className={`h-fit ${
                            index === 0 ? "w-full" : "w-fit"
                          } relative flex items-center justify-center gap-x-2 mb-2 tracking-tighter`}
                        >
                          <p className="text-neutral-400 text-center text-sm dark:text-neutral-300 w-[5rem]">
                            {key}
                            <br />
                            {formatCurrency(delta[key])}
                          </p>
                          {index === 0 ? (
                            <div className="relative grow flex items-center justify-center h-full w-[15rem] mr-2">
                              <div className="rounded-full bg-emerald-500 h-[2.5px] w-full" />
                              <CaretUpFilled
                                className={classNames({
                                  "text-emerald-500 dark:text-emerald-500 text-sm":
                                    true,
                                  "absolute top-0 cursor-default": true,
                                })}
                                style={{ left: `${change}%` }}
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Fundamental Section */}
      {selectedCoinData.hasOwnProperty("id") ? (
        <div className="p-4rounded-lg w-full relative">
          <h2 className="bound text-2xl font-medium mb-4 w-full relative text-neutral-700 dark:text-white">
            {`Fundamentals`}
            <div className="w-3/4 h-[1px] bg-neutral-700 dark:bg-white" />
          </h2>
          <div className=" poppins w-[22rem]">
            {Object.keys(fundamentals).map((key: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex justify-between mb-2 tracking-tighter"
                >
                  <p className="text-neutral-400 font-medium dark:text-neutral-300">
                    {key}
                  </p>
                  <p className="text-neutral-600 dark:text-white font-bold text-sm">{`${
                    index <= 2 ? "$" : ""
                  } ${formatCurrency(fundamentals[key])}`}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* About Section */}
      {selectedCoinData.hasOwnProperty("description") ? (
        <div className="p-4rounded-lg w-full relative">
          <h2 className="bound text-2xl font-medium mb-4 w-full relative text-neutral-700 dark:text-white">
            {`About ${selectedCoinData.name}`}
            <div className="w-3/4 h-[1px] bg-neutral-700 dark:bg-white" />
          </h2>
          <div
            className="text-neutral-600 dark:text-white poppins w-[90%]"
            dangerouslySetInnerHTML={{
              __html:
                selectedCoinData.description.en
                  .split(". ")
                  .slice(0, 4)
                  .join(". ") + "...",
            }}
          />
          <div className={"w-full h-[8rem] bg-transparent"} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CoinChart;
