import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

import useTheme from "@/contexts/theme/useTheme";

function ThemeButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      className="dark:bg-gray-700 dark:hover:bg-gray-800 bg-gray-100 hover:bg-gray-200 transition p-2 rounded-md outline-transparent"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <SunIcon className="w-6 h-6 text-white" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
}

export default function Menu() {
  return (
    <div className="w-full h-12 select-none flex items-center p-1">
      <div className="ml-auto">
        <ThemeButton />
      </div>
    </div>
  );
}
