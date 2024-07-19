import { useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setHoldingData } from "@/redux/reducers/coinSlice";
import SortArrows from "../shared/SortArrows";
import sortData from "@/scripts/sortingScript";
import Image from "next/image";
import { CompanyFetcher } from "@/scripts/fetchScript";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

const HomeaTable = ({ data }: { data: any[] }) => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const { sort_holding, sort_holding_usd, selectedCoin } = useAppSelector(
    (state: any) => state.coins
  );

  useEffect(() => {
    CompanyFetcher(selectedCoin).then((res) => {
      dispatch(setHoldingData(res));
    });
  }, []);

  return (
    <div
      className={classNames({
        "relative shadow-[0px_0px_10px_0px_#c5c5c5] dark:shadow-[0px_0px_0px_0px_#333333] sm:rounded-lg":
          true,
        [`h-[30rem] w-full`]: true,
        "overflow-y-scroll dark:bg-neutral-800": true,
        "ml-4": isSidebarOpen,
      })}
    >
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
            <th scope="col" className="px-3 py-3">
              {"Name (Symbol)"}
            </th>
            <th scope="col" className="px-3 py-3 text-center">
              {"Country"}
            </th>
            <th scope="col" className="px-3 py-3">
              <div className="flex items-center justify-center text-right">
                {"Total Holdings (BTC/ETH)"}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    let sortedData = sortData(
                      data,
                      sort_holding,
                      "holding",
                      dispatch
                    );
                    dispatch(setHoldingData(sortedData));
                  }}
                >
                  <SortArrows />
                </div>
              </div>
            </th>
            <th scope="col" className="px-3 py-3">
              <div className="flex items-center justify-center text-right">
                {"Total Holdings (USD)"}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    let sortedData = sortData(
                      data,
                      sort_holding_usd,
                      "holding_usd",
                      dispatch
                    );
                    dispatch(setHoldingData(sortedData));
                  }}
                >
                  <SortArrows />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="w-full h-full relative">
          {data.length > 0 ? (
            <>
              {data.map((company: any, i: number) => {
                return (
                  <tr
                    key={i}
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
                      className={`cursor-pointer group-hover:scale-105 pl-3 py-4 font-medium text-neutral-900 dark:text-white w-fit`}
                    >
                      <div className="cursor-pointer flex items-center gap-x-2">
                        <p className="cursor-pointer">{`${company.name} (${company.symbol})`}</p>
                      </div>
                    </td>
                    <td
                      scope={"col"}
                      className="cursor-pointer px-3 py-4 w-[20%] text-center group-hover:scale-105"
                    >
                      {company.country}
                    </td>
                    <td
                      scope={"col"}
                      className="cursor-pointer px-3 py-4 w-[20%] text-center group-hover:scale-105"
                    >
                      {formatCurrency(company.total_holdings)}
                    </td>
                    <td
                      scope={"col"}
                      className="cursor-pointer px-3 py-4 w-[20%] text-center group-hover:scale-105"
                    >
                      ${formatCurrency(company.total_entry_value_usd)}
                    </td>
                  </tr>
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
                    {"No Data Found!..."}
                  </h4>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeaTable;
