import { useCallback } from "react";
import { useDrag } from "react-dnd";

const DraggableCoin = ({ coin, children }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COIN",
    item: { coin },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const ref = useCallback(
    (node: any) => {
      drag(node);
    },
    [drag]
  );

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </tr>
  );
};

export default DraggableCoin;
