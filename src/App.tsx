import React from "react";

import Connections from "@/components/Connections";
import Menu from "@/components/Menu";

import "./index.css";

export default function App() {
  return (
    <div className="flex h-full w-full dark:bg-gray-900">
      <Connections />
      <Menu />
    </div>
  );
}
