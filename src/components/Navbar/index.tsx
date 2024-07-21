import classNames from "classnames";
import DarkMode from "../DarkMode";
import Image from "next/image";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { openSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import NavSearch from "./Searchbar";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const { currentSection } = useAppSelector((state: any) => state.section);

  return (
    <nav
      className={classNames({
        "sm:pl-10 pl-[0.75rem] mobile:px-0 pr-6 sm:pr-10": true,
        "bg-transparent z-[1000]": true, // colors
        "flex flex-col items-center justify-center gap-y-3": true, // layout
        "w-full relative py-3 h-fit": true, //positioning & styling
      })}
    >
      <div
        className={classNames({
          "bg-transparent z-[1000]": true, // colors
          "flex items-center justify-between": true, // layout
          "w-full relative h-fit": true, //positioning & styling
        })}
      >
        <div className="w-fit h-fit flex justify-center items-center gap-4 relative">
          <div
            onClick={() => dispatch(openSidebar())}
            className={classNames({
              [`${pathname === "/" ? "hidden" : "flex"}`]: true,
              "mobile:w-[32px] mobile:h-[32px] w-[42px] h-[42px] items-center justify-center":
                true,
              [`${
                !isSidebarOpen
                  ? "bg-primary text-main"
                  : "bg-[#e8e8e8] text-[#37474f]"
              } mobile:text-[0.95rem] text-3xl rounded-r-lg`]: true,
              "z-[100001] transition-all": true,
              "fixed left-0": true,
            })}
          >
            {isSidebarOpen ? <CaretLeftOutlined /> : <CaretRightOutlined />}
          </div>
          <div
            onClick={() => router.push("/")}
            className="mobile:ml-6 w-fit h-fit flex justify-center items-center mobile:gap-1 gap-2 relative cursor-pointer"
          >
            <Image
              src={`/cf_logo.svg`}
              width={42}
              height={42}
              alt="cf_logo"
              className={`dark:invert sm:w-[42px] sm:h-[42px] w-[32px] h-[32px] cursor-pointer`}
            />
            <h3
              className={classNames({
                "mobile:text-lg bound font-bold text-xl sm:text-2xl text-primary":
                  true,
                "flex justify-center items-center gap-4 cursor-pointer": true,
              })}
            >
              {"CoinFolio"}
            </h3>
          </div>
        </div>
        {pathname !== "/" && currentSection !== 1 && (
          <div className={"hidden sm:block"}>
            <NavSearch />
          </div>
        )}
        <div className={`flex items-center justify-center`}>
          <DarkMode />
        </div>
      </div>
      {pathname !== "/" && currentSection !== 1 && (
        <div className={"sm:hidden block w-full"}>
          <NavSearch />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
