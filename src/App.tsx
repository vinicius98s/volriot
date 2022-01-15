import React from "react";
import Split from "react-split";

import Connections from "@/components/Connections";
import Menu from "@/components/Menu";

import "./index.css";

function App() {
  return (
    <Split
      className="h-screen w-screen dark:bg-gray-900 bg-white flex"
      minSize={220}
    >
      <Connections />
      <Menu />
    </Split>
  );
}

export default App;
