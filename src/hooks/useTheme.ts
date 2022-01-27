import { useEffect } from "react";

import { Theme } from "@bindings/Theme";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const html = document.querySelector("html");

    if (theme === "light") {
      html?.classList.remove("dark");
    } else {
      html?.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
}
