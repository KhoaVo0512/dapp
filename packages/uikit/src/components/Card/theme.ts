import { vars } from "@pancakeswap/ui/css/vars.css";
import { darkColors, lightColors } from "../../theme/colors";
import { CardTheme } from "./types";

export const light: CardTheme = {
  background: lightColors.backgroundAlt,
  boxShadow: "none",
  boxShadowActive:"none",
  boxShadowSuccess: "none",
  boxShadowWarning: "none",
  cardHeaderBackground: {
    default: lightColors.gradientCardHeader,
    blue: lightColors.gradientBlue,
    bubblegum: lightColors.gradientBubblegum,
    violet: lightColors.gradientViolet,
  },
  dropShadow: "none",
};

export const dark: CardTheme = {
  background: darkColors.backgroundAlt,
  boxShadow: "none",
  boxShadowActive: "none",
  boxShadowSuccess: "none",
  boxShadowWarning: "none",
  cardHeaderBackground: {
    default: darkColors.gradientCardHeader,
    blue: darkColors.gradientBlue,
    bubblegum: lightColors.gradientBubblegum,
    violet: darkColors.gradientViolet,
  },
  dropShadow: "none",
};
