import { setSortingDirCP, setSortingDirMC } from "@/redux/reducers/coinSlice";

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
      : reduxDispatch(setSortingDirMC("asc"));
  } else if (dir === "asc") {
    property === "current_price"
      ? reduxDispatch(setSortingDirCP("desc"))
      : reduxDispatch(setSortingDirMC("desc"));
  }
  return dummyData;
};

export default sortData;
