import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div>
        <Navbar />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <Sidebar />
        {props.children}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
