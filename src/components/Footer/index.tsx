import classNames from "classnames";
import {
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className={classNames({
        "w-screen mx-auto p-4 md:px-6 md:py-2": true,
        "h-[10vh] md:flex md:items-center md:justify-between": true,
        "max-md:flex-col max-md:items-center max-md:justify-center": true,
        "text-zinc-500 bg-primary": true,
        "shadow-[0px_-1px_2px_0_rgba(0,0,0,0.075)] dark:shadow-[0px_-1px_2px_0_rgba(255,255,255,0.1)]":
          true,
      })}
    >
      <div className="flex justify-center items-center gap-4 max-md:mb-2">
        <Image src="/cf_logo.svg" width={42} height={42} alt="cf_logo" />
        <h3
          className={classNames({
            "font-bold text-lg": true,
            "flex justify-center items-center gap-4": true,
          })}
        >
          CoinFolio
        </h3>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <Link rel="nofollow noreferrer" target={"_blank"} href="#">
          <LinkedinOutlined className="text-2xl text-blue-700" />
        </Link>
        <Link rel="nofollow noreferrer" target={"_blank"} href="#">
          <FacebookOutlined className="text-2xl text-blue-700" />
        </Link>
        <Link rel="nofollow noreferrer" target={"_blank"} href="#">
          <TwitterOutlined className="text-2xl text-blue-700" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
