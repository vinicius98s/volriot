import React, { useEffect } from "react";
import Split from "react-split";
import { invoke } from "@tauri-apps/api/tauri";

import Connections from "@/components/Connections";
import Menu from "@/components/Menu";

import "./index.css";

// const CONNECTIONS_MIN_WIDTH = 280;

function App() {
  useEffect(() => {
    (async () => {
      // await invoke<void>("write_data", {
      //   key: "a",
      //   value: { name: "vinicius" },
      // });
      const response = await invoke("read_data", { key: "a" });
      console.log("Response from read data", response);
    })();
  }, []);
  return (
    <Split
      className="h-screen w-screen dark:bg-gray-900 bg-white flex"
      snapOffset={0}
      // minSize={[CONNECTIONS_MIN_WIDTH, minPanelSize]}
    >
      <Connections />
      <Menu />
    </Split>
  );
}

export default App;
