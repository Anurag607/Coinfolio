import { combineReducers } from "redux";
import sidebarSlice from "./reducers/sidebarSlice";
import searchSlice from "./reducers/searchSlice";
import filterSlice from "./reducers/filterSlice";
import drawerSlice from "./reducers/drawerSlice";
import coinSlice from "./reducers/coinSlice";
import menuSlice from "./reducers/menuSlice";
import sectionSlice from "./reducers/sectionSlice";

export default combineReducers({
  menu: menuSlice,
  coins: coinSlice,
  sidebar: sidebarSlice,
  searchBar: searchSlice,
  filter: filterSlice,
  drawer: drawerSlice,
  section: sectionSlice,
});
