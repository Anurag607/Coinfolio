import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "@/redux/hooks";
import { updateWatchlist } from "@/redux/reducers/coinSlice";

const DroppableTable = ({ children, type }: any) => {
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COIN",
    drop: (item: any) => {
      if (type === "watchlist") {
        dispatch(updateWatchlist(item.coin));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const ref = useCallback(
    (node: any) => {
      drop(node);
    },
    [drop]
  );

  return (
    <tbody
      ref={ref}
      style={{ backgroundColor: isOver ? "#e0e0e0" : "transparent" }}
    >
      {children}
    </tbody>
  );
};

export default DroppableTable;
