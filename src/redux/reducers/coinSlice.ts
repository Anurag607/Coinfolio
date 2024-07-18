import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coinData: [] as any[],
    backupData: [] as any[],
    categoryData: [] as any[],
    sort_market_cap: "desc",
    sort_current_price: "asc",
    selectedCoin: "bitcoin",
    marketData: [],
  },
  reducers: {
    setCoinData: (state, action) => {
      state.coinData = action.payload;
      if (state.backupData.length < 50) state.backupData = action.payload;
    },
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
    clearCoinData: (state) => {
      state.coinData = [];
    },
    sortCoinData: (state, action) => {
      state.coinData = action.payload;
    },
    setSortingDirCP: (state, action) => {
      state.sort_current_price = action.payload;
    },
    setSortingDirMC: (state, action) => {
      state.sort_market_cap = action.payload;
    },
    filterCoinData: (state, action) => {
      let tokens = action.payload
        .toLowerCase()
        .split(" ")
        .filter(function (token: string) {
          return token.trim() !== "";
        });
      let searchTermRegex = new RegExp(tokens.join("|"), "gim");
      let filteredResults: any[] = [];
      let coinString = "";

      if (tokens.length === 0) {
        state.coinData = state.backupData;
      } else {
        state.coinData.forEach((coin: any) => {
          coinString += coin.name.toLowerCase() + coin.symbol.toLowerCase();
          if (coinString.match(searchTermRegex)) {
            filteredResults.push(coin);
            coinString = "";
          }
        });
      }
      state.coinData = filteredResults;
    },
    setSelectedCoin(state, action: PayloadAction<string>) {
      state.selectedCoin = action.payload;
    },
    setMarketData(state, action: PayloadAction<any>) {
      state.marketData = action.payload;
    },
  },
});

export const {
  setCoinData,
  setCategoryData,
  clearCoinData,
  sortCoinData,
  filterCoinData,
  setSortingDirCP,
  setSortingDirMC,
  setSelectedCoin,
  setMarketData,
} = coinSlice.actions;

export default coinSlice.reducer;
