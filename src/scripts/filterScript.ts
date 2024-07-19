import { setCoinData } from "@/redux/reducers/coinSlice";

const filterData = async (
  data: any,
  backupData: any,
  filterParam: string,
  reduxDispatch: React.Dispatch<any>
) => {
  let filteredData: any[] = [];
  let fetchedData: any[] = [];
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${filterParam}&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Content: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status !== 404) fetchedData = await response.json();
    backupData.forEach((coin: any) => {
      fetchedData.forEach((fetchCoin) => {
        if (coin.id === fetchCoin.id) {
          filteredData.push(coin);
          return;
        }
      });
    });
    reduxDispatch(setCoinData(filteredData));
  } catch (err: any) {
    console.error(err);
  }
};

export default filterData;
