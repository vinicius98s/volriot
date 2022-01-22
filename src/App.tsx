import React, { useEffect } from "react";
import Split from "react-split";
import { invoke } from "@tauri-apps/api";

import Connections from "@/components/Connections";
import Menu from "@/components/Menu";

import "./index.css";

import { RedisConnection } from "@bindings/RedisConnection";

// const CONNECTIONS_MIN_WIDTH = 280;

const connectionInfo: RedisConnection = {
  name: "vinicius",
};

function App() {
  useEffect(() => {
    invoke("test_connection", { connectionInfo })
      .then(console.log)
      .catch(console.error);
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
