import classNames from "classnames";

const RankImage = ({ imageURL, rank }: { imageURL: string; rank: number }) => {
  return (
    <div
      className={classNames({
        "relative w-auto cursor-pointer": true,
        "flex item-center justify-center": true,
        "rounded-full overflow-hidden": true,
        "overflow-hidden": true,
        "bg-center bg-no-repeat bg-cover blue-lg": true,
        "min-h-[3rem] min-w-[3rem]": true,
      })}
      style={{
        backgroundImage: `url(${imageURL})`,
      }}
    >
      <div
        className={classNames({
          "absolute top-0 bottom-0 left-0 right-0 cursor-pointer": true,
          "grid place-items-center": true,
          "md:px-4 md:py-2": rank >= 10 ? false : true,
          "md:px-3 md:py-2": rank < 10 ? false : true,
          "max-md:px-[32.5%] max-md:py-[7.5%]": rank >= 10 ? false : true,
          "max-md:px-[15%] max-md:py-[7.5%]": rank < 10 ? false : true,
          "bg-gray-800 opacity-60": true,
          "rounded-full overflow-hidden": true,
        })}
      >
        <h3 className="text-xl text-white font-bold cursor-pointer">{rank}</h3>
      </div>
    </div>
  );
};

export default RankImage;
