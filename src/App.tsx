import React from "react";

import ThemeContextProvider from "@/contexts/theme/Context";

import Connections from "@/components/Connections";
import Menu from "@/components/Menu";

import "./index.css";

export default function App() {
  return (
    <ThemeContextProvider>
      <div className="flex h-full w-full dark:bg-gray-900">
        <Connections />
        <Menu />
      </div>
    </ThemeContextProvider>
  );
}
