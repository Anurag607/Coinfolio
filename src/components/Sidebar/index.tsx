import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import {
  closeSidebar,
  collapseSidebar,
  expandSidebar,
  openSidebar,
} from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AreaChartOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  DoubleRightOutlined,
  OrderedListOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { setCurrentSection } from "@/redux/reducers/sectionSlice";

const Sidebar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { currentSection } = useAppSelector((state: any) => state.section);
  const { isSidebarOpen, expanded } = useAppSelector(
    (state: any) => state.sidebar
  );

  useOnClickOutside(ref, () => {
    dispatch(closeSidebar());
  });

  return (
    <div
      className={classNames({
        "flex items-center justify-center z-[100001]": true,
        "bg-[#37352F] text-zinc-50": true,
        "fixed left-0 top-0": true,
        [`h-screen ${!expanded ? "mobile:w-[3rem] w-[5rem]" : "w-screen"}`]:
          true,
        "transition-all ease-in-out": true,
        "bg-center bg-cover bg-no-repeat": true,
        [`${
          isSidebarOpen
            ? "translate-x-0"
            : !expanded
            ? "-translate-x-full"
            : "translate-x-0"
        }`]: true,
      })}
      ref={ref}
    >
      {/* Back Button */}
      <div
        onClick={() => dispatch(isSidebarOpen ? closeSidebar() : openSidebar())}
        className={classNames({
          "mobile:w-[30px] mobile:h-[30px] w-[42px] h-[42px] items-center justify-center":
            true,
          "bg-[#e8e8e8] text-neutral-700 rounded-lg left-[22px]": isSidebarOpen,
          "bg-red-500 text-[#F7F6F3] rounded-r-lg left-0": !isSidebarOpen,
          "mobile:text-[0.95rem] text-3xl rounded-r-lg cursor-pointer": true,
          "fixed top-3 z-[100001] transition-all": true,
          [`${!expanded ? "flex" : "hidden"}`]: true,
        })}
      >
        {isSidebarOpen ? <CaretLeftOutlined /> : <CaretRightOutlined />}
      </div>
      <div
        className={classNames({
          "flex items-center justify-center gap-x-4 flex-row-reverse": true,
          "-rotate-90 translate-y-[-50%] absolute top-1/2 left-0": true,
          [`${!expanded ? "translate-x-[-40%]" : "translate-x-[-37.5%]"}`]:
            true,
          "transition-all ease-in-out": true,
        })}
      >
        {/* Home */}
        <div
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCurrentSection(0));
          }}
          className={classNames({
            "!bg-white !text-neutral-700": currentSection === 0,
            [`mobile:w-[30px] mobile:h-[30px] w-[42px] h-[42px] flex items-center justify-center ${
              !expanded && "mobile:mt-1 mt-1"
            }`]: true,
            "bg-transparent border font-bold border-[#F7F6F3] text-[#F7F6F3] rounded-lg left-3":
              true,
            [`mobile:text-[0.95rem] text-3xl rounded-r-lg cursor-pointer rotate-90`]:
              true,
            "transition-all hover:scale-105": true,
          })}
        >
          <HomeOutlined />
        </div>
        {/* Coin List */}
        <div
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCurrentSection(1));
          }}
          className={classNames({
            "!bg-white !text-neutral-700": currentSection === 1,
            [`mobile:w-[30px] mobile:h-[30px] w-[42px] h-[42px] flex items-center justify-center ${
              !expanded && "mobile:mt-1 mt-1"
            }`]: true,
            "bg-transparent border font-bold border-[#F7F6F3] text-[#F7F6F3] rounded-lg left-3":
              true,
            [`mobile:text-[0.95rem] text-3xl rounded-r-lg cursor-pointer rotate-90`]:
              true,
            "transition-all hover:scale-105": true,
          })}
        >
          <OrderedListOutlined />
        </div>
        {/* Coin Chart */}
        <div
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCurrentSection(2));
          }}
          className={classNames({
            "!bg-white !text-neutral-700": currentSection === 2,
            [`mobile:w-[30px] mobile:h-[30px] w-[42px] h-[42px] flex items-center justify-center ${
              !expanded && "mobile:mt-1 mt-1"
            }`]: true,
            "bg-transparent border font-bold border-[#F7F6F3] text-[#F7F6F3] rounded-lg left-3":
              true,
            [`mobile:text-[0.95rem] text-3xl rounded-r-lg cursor-pointer rotate-90`]:
              true,
            "transition-all hover:scale-105": true,
          })}
        >
          <AreaChartOutlined />
        </div>
        <h1
          className={classNames({
            "bound mobile:text-[2rem] text-[3rem] tracking-tighter font-bold text-[#F7F6F3]":
              true,
          })}
        >
          {"CoinFolio"}
        </h1>
      </div>
      {/* Loader */}
      <div
        className={classNames({
          [`${expanded ? "flex mobile:scale-[0.6]" : "hidden"}`]: true,
          [`loadingContainer opacity-0 cursor-default transition-all ease-in-out pointer-event-none`]:
            true,
          [`${isLoading ? "opacity-100" : "opacity-0"}`]: true,
        })}
      >
        <div className="row">
          <div className="col dark">
            <div className="loader">
              <span
                data-flicker-0="LOAD"
                data-flicker-1="ING"
                className="loader-text font-bold ml-1"
              >
                LOADING
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
