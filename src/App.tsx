import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

(async () => {
  try {
    const hello = await invoke("fetch_an_integer", { value: 777 });
    console.log(hello);
  } catch (e) {
    console.error(e);
  }
})();

function App() {
  return <h1>Hello world</h1>;
}

export default App;
