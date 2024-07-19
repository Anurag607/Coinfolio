"use client";

import Link from "next/link";
import classNames from "classnames";
import { CaretRightFilled } from "@ant-design/icons";
import { useEffect } from "react";

const heading = "Where Crypto Management Meets Simplicity";
const subHeading = "Your Comprehensive Tool for Cryptocurrency Management";

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("persist:root");
  }, []);

  return (
    <main
      className={
        "w-screen h-screen flex flex-col justify-start items-center relative"
      }
    >
      <div
        className={classNames({
          "w-full h-full flex flex-col items-center justify-center gap-y-6":
            true,
        })}
      >
        <div
          className={classNames({
            "flex flex-col items-center justify-center gap-y-6": true,
          })}
        >
          <div
            className={classNames({
              "mobile-sm:text-2xl text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-primary text-center bound tracking-wide":
                true,
              "mobile-sm:w-[95vw] w-[35rem] sm:w-[40rem] md:w-[45rem] h-fit break-before-avoid":
                true,
            })}
          >
            {heading + ". Welcome to CoinFolio."}
          </div>
          <div
            className={classNames({
              "mobile-sm:text-2xl text-3xl font-bold text-primary text-center mento tracking-tight":
                true,
              "mobile-sm:w-[95vw] w-[35rem] sm:w-[40rem] md:w-[45rem] h-fit break-before-avoid":
                true,
            })}
          >
            {subHeading}
          </div>
        </div>
        <Link href={"/tracker"}>
          <button
            className={classNames({
              "flex justify-center items-center gap-2": true,
              "mobile-sm:px-4 px-10 py-2 cursor-pointer": true,
              "text-main font-normal mobile-sm:text-sm text-lg bound hover:text-[#37474f] dark:hover:text-white":
                true,
              "border border-primary rounded-full": true,
              "bg-primary hover:bg-sidebar": true,
            })}
          >
            {"Get Started"}
            <CaretRightFilled />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
