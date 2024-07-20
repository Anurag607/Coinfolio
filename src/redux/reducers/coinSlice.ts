import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coinList: [] as any[],
    coinData: [] as any[],
    backupData: [] as any[],
    categoryData: [] as any[],
    sort_market_cap: "desc",
    sort_current_price: "asc",
    selectedCoin: "bitcoin",
    selectedCoinData: [],
    watchlist: [] as any[],
    recentlyViewed: [] as any[],
    recentlysearched: [] as string[],
    currentData: {
      currentDataId: "",
      data: [],
    },
    holdingData: [] as any[],
    sort_holding: "desc",
    sort_holding_usd: "desc",
    globalData: {},
  },
  reducers: {
    setCoinList: (state, action) => {
      state.coinList = action.payload;
    },
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
    setSelectedCoinData(state, action: PayloadAction<any>) {
      state.selectedCoinData = action.payload;
    },
    updateWatchlist(state, action: PayloadAction<any>) {
      // state.watchlist = [];
      // return;
      if (state.watchlist.some((coin: any) => coin.id === action.payload.id)) {
        state.watchlist = state.watchlist.filter(
          (coin: any) => coin.id !== action.payload.id
        );
      } else {
        state.watchlist.unshift(action.payload);
      }
    },
    updateRecentlyViewed(state, action: PayloadAction<any>) {
      // state.recentlyViewed = [];
      // return;
      state.recentlyViewed = state.recentlyViewed.filter(
        (coin: any) => coin.id !== action.payload.id
      );
      state.recentlyViewed.unshift(action.payload);
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed.pop();
      }
    },
    updateRecentlySearched(state, action: PayloadAction<string>) {
      // state.recentlysearched = [];
      // return;
      state.recentlysearched = state.recentlysearched.filter(
        (coin: string) => coin !== action.payload
      );
      state.recentlysearched.unshift(action.payload);
      if (state.recentlysearched.length > 10) {
        state.recentlysearched.pop();
      }
    },
    setCurrentData: (state, action) => {
      state.currentData = action.payload;
    },
    setHoldingData: (state, action) => {
      state.holdingData = action.payload;
    },
    setSortingDirHolding: (state, action) => {
      state.sort_holding = action.payload;
    },
    setSortingDirHoldingUSD: (state, action) => {
      state.sort_holding_usd = action.payload;
    },
    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },
  },
});

export const {
  setCoinList,
  setCoinData,
  setCategoryData,
  clearCoinData,
  sortCoinData,
  filterCoinData,
  setSortingDirCP,
  setSortingDirMC,
  setSelectedCoin,
  setSelectedCoinData,
  updateWatchlist,
  updateRecentlyViewed,
  updateRecentlySearched,
  setCurrentData,
  setHoldingData,
  setSortingDirHolding,
  setSortingDirHoldingUSD,
  setGlobalData,
} = coinSlice.actions;

export default coinSlice.reducer;
