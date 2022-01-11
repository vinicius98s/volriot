import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

(async () => {
  try {
    const hello = await invoke("fetch_an_integer", { value: 10 });
    console.log("the number is", hello);
  } catch (e) {
    console.error(e);
  }
})();

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <button onClick={() => setCounter(10)}>add</button>
      {counter}
      <h1>Hello world</h1>
    </>
  );
}

export default App;
