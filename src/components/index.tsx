"use client";

import dynamic from "next/dynamic";

export const ErrorBoundaryWrapper = dynamic(() => import("./ErrorBoundary"), {
  ssr: true,
});
export const LoaderSkeleton = dynamic(() => import("./LoadingUI"), {
  ssr: true,
});
export const ScrollToTop = dynamic(() => import("./ScrollToTop"), {
  ssr: true,
});
export const DarkMode = dynamic(() => import("./DarkMode"), { ssr: true });
export const Footer = dynamic(() => import("./Footer"), { ssr: true });
export const Navbar = dynamic(() => import("./Navbar"), { ssr: true });
export const Sidebar = dynamic(() => import("./Sidebar"), { ssr: true });
export const Search = dynamic(() => import("./Search"), { ssr: true });
export const LoadingSpinner = dynamic(() => import("./LoadingSpinner"), {
  ssr: true,
});
export const CoinChart = dynamic(() => import("./Charts"), { ssr: true });
export const Home = dynamic(() => import("./Home"), { ssr: true });
