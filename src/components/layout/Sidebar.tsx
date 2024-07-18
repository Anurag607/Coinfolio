import { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";
import { closeSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  navItems?: NavItem[];
};

const Sidebar = ({ navItems = defaultNavItems }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  useOnClickOutside(ref, () => {
    dispatch(closeSidebar());
  });

  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true, // layout
        "bg-indigo-700 text-zinc-50": true, // colors
        "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_125px)] h-full w-[500px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !isSidebarOpen, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-indigo-100 hover:bg-indigo-900": true, //colors
                    "flex gap-4 items-center ": true, //layout
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
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
