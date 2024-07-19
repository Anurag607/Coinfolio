import {
  setSortingDirCP,
  setSortingDirHolding,
  setSortingDirHoldingUSD,
  setSortingDirMC,
} from "@/redux/reducers/coinSlice";

const sortData = (
  data: any,
  dir: string,
  property: string,
  reduxDispatch: React.Dispatch<any>
) => {
  let dummyData = [...data];

  if (dir === "desc")
    dummyData.sort((a: any, b: any) => a[property] - b[property]);
  else if (dir === "asc")
    dummyData.sort((a: any, b: any) => b[property] - a[property]);

  if (dir === "desc") {
    property === "current_price"
      ? reduxDispatch(setSortingDirCP("asc"))
      : property === "market_cap"
      ? reduxDispatch(setSortingDirMC("asc"))
      : property === "holding"
      ? reduxDispatch(setSortingDirHolding("asc"))
      : property === "holding_usd"
      ? reduxDispatch(setSortingDirHoldingUSD("asc"))
      : null;
  } else if (dir === "asc") {
    property === "current_price"
      ? reduxDispatch(setSortingDirCP("desc"))
      : property === "market_cap"
      ? reduxDispatch(setSortingDirMC("desc"))
      : property === "holding"
      ? reduxDispatch(setSortingDirHolding("desc"))
      : property === "holding_usd"
      ? reduxDispatch(setSortingDirHoldingUSD("desc"))
      : null;
  }
  return dummyData;
};

export default sortData;
