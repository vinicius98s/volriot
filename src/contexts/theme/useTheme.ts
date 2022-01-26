import { useContext } from "react";
import invariant from "ts-invariant";

import { ThemeContext } from "./Context";

export default function useTheme() {
  const theme = useContext(ThemeContext);

  invariant(theme, "Theme outside context");

  return theme;
}
