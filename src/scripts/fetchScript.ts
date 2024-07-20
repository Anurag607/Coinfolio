const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
  },
};

export const CoinFetcher = async (page: number) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const CategoryFetcher = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/categories/list",
      options
    );
    const data = await response.json();
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
