import React, { createContext, ReactNode, useEffect } from "react";

import { Theme } from "@bindings/Theme";
import useLocalStorage from "@/hooks/useLocalStorage";

type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type Props = { children: ReactNode };

export default function ThemeContextProvider(props: Props) {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
