import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCoin, setMarketData } from "@/redux/reducers/coinSlice";
import classNames from "classnames";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CoinChart = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [isCoinOpen, setIsCoinOpen] = useState(false);
  const { selectedCoin, marketData, backupData } = useSelector(
    (state: any) => state.coins
  );

  useEffect(() => {
    fetchMarketData(selectedCoin);
  }, []);

  useEffect(() => {
    fetchMarketData(selectedCoin);
  }, [selectedCoin]);

  const fetchMarketData = async (coin: string) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=1`,
      {
        method: "GET",
        headers: {
          Content: "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    dispatch(setMarketData(data.prices || []));
  };

  const options = {
    chart: {
      type: "area",
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toFixed(2),
      },
    },
  } as any;

  const series = [
    {
      name: selectedCoin,
      data: (typeof marketData === "undefined" ? [] : marketData).map(
        (item: any) => ({
          x: new Date(item[0]),
          y: item[1],
        })
      ),
    },
  ];

  return (
    <div className="w-full h-full relatve flex flex-col items-start justify-start gap-y-8">
      <div
        ref={ref}
        className={classNames({
          "w-full relative flex items-center justify-center": true,
          "cursor-pointer": true,
        })}
        onClick={() => {
          !isCoinOpen ? setIsCoinOpen(true) : setIsCoinOpen(false);
        }}
      >
        <button
          className={classNames({
            "cursor-pointer grid place-content-start": true,
            "bg-white w-full": true,
            "py-[0.5rem] px-[0.5rem] rounded-md": true,
            "border-2 border-zinc-200": true,
            "mt-1": true,
          })}
        >
          {selectedCoin}
        </button>
        <div
          className={classNames({
            "flex flex-col justify-start items-start pr-2.5 overflow-hidden":
              true,
            "z-[1000001] bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-700":
              true,
            "absolute top-[2.75rem] right-2": true,
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
    </div>
  );
};

export default CoinChart;
