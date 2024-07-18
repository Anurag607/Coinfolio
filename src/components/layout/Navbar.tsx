import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { defaultNavItems } from "./defaultNavItems";
import { openMenu, closeMenu } from "@/redux/reducers/menuSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  navItems?: NavItem[];
};

const Navbar = ({ navItems = defaultNavItems }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isMenuOpen } = useAppSelector((state: any) => state.menu);
  useOnClickOutside(ref, () => {
    dispatch(closeMenu());
  });

  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center justify-between px-8": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="flex justify-center items-center gap-4">
        <Image src="/logo.png" width={42} height={42} alt="logo" />
        <h3
          className={classNames({
            "font-bold text-lg": true,
            "flex justify-center items-center gap-4": true,
          })}
        >
          Coinwatch
        </h3>
      </div>
      <div className="" ref={ref}>
        <button className="md:hidden cursor-pointer z-[1000]">
          <Bars3Icon
            className="h-6 w-6 cursor-pointer z-[1000]"
            onClick={() => {
              !isMenuOpen ? dispatch(openMenu()) : dispatch(closeMenu());
            }}
          />
        </button>
        <div
          className={classNames({
            "flex flex-col": true,
            "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700":
              true,
            "absolute top-[4.5rem] right-2": true,
            "md:hidden": true,
            "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
            "w-0 py-0": !isMenuOpen,
          })}
        >
          {navItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={classNames({
                  "py-1": true,
                  "flex items-center justify-start": true, //layout
                })}
                onClick={() => dispatch(closeMenu())}
              >
                <li
                  className={classNames({
                    "text-blue-800 hover:bg-blue-800 hover:text-white": true, //colors
                    "flex gap-4 items-center w-full": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-2": true, //self style
                    "cursor-pointer": true,
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
