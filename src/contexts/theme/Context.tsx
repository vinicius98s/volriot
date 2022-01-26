import React, { createContext, ReactNode, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";

import { UserPreferences } from "@bindings/UserPreferences";
import { Theme } from "@bindings/Theme";

type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type Props = { children: ReactNode };

async function savePreferences(preferences: UserPreferences) {
  await invoke<void>("save_user_preferences", { preferences });
}

export default function ThemeContextProvider(props: Props) {
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    invoke<UserPreferences>("get_user_preferences").then(({ theme }) =>
      setTheme(theme)
    );
  }, []);

  useEffect(() => {
    document.querySelector("html")?.classList.toggle("dark");
    savePreferences({ theme });
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
