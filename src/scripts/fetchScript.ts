import Page from "@/app/tracker/page";
import { setCategoryData, setCoinData } from "@/redux/reducers/coinSlice";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
  },
};

export const CoinFetcher = async (
  reduxDispatch: React.Dispatch<any>,
  page: number,
  coinData: any[]
) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${Page}&sparkline=false`,
      options
    );
    const data = await response.json();
    reduxDispatch(setCoinData([...coinData, data]));
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
    options
  );
  const data = await response.json();
  return data;
};

export const CompanyFetcher = async (coin: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/companies/public_treasury/${coin}`,
    options
  );
  const data = await response.json();
  return data.companies;
};

export const GlobalDataFetcher = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/global`,
    options
  );
  const data = await response.json();
  return data.data;
};

export const CoinListFetcher = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/list`,
    options
  );
  const data = await response.json();
  return data;
};
