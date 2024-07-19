import { setCategoryData, setCoinData } from "@/redux/reducers/coinSlice";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
  },
};

export const CoinFetcher = async (reduxDispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
      options
    );
    const data = await response.json();
    reduxDispatch(setCoinData(data));
    return data;
  } catch (err) {
    return [];
  }
};

export const CategoryFetcher = async (reduxDispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/categories/list",
      options
    );
    const data = await response.json();
    reduxDispatch(setCategoryData(data));
    return data;
  } catch (err) {
    return [];
  }
};

export const CoinChartDataFetcher = async (coin: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`,
    options
  );
  const data = await response.json();
  return data;
};

export const CoinDetailFetcher = async (coin: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}`,
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
  return data;
};
