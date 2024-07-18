import { setCategoryData, setCoinData } from "@/redux/reducers/coinSlice";

export const CategoryFetcher = async (reduxDispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CRYPTO_CATEGORIES!, {
      method: "GET",
      mode: "cors",
      headers: {
        Content: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    reduxDispatch(setCategoryData(data));
    return data;
  } catch (err) {
    return [];
  }
};

export const CoinFetcher = async (reduxDispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CRYPTOLIST!, {
      method: "GET",
      mode: "cors",
      headers: {
        Content: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    reduxDispatch(setCoinData(data));
    return data;
  } catch (err) {
    return [];
  }
};
