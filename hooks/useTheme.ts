import { useColorScheme } from "react-native";
import { Colors, ColorName, palette } from "@/constants/Colors";

/**
 * A hook that provides easy access to the current theme colors
 * and utility functions for working with colors
 */
export function useTheme() {
  const colorScheme = useColorScheme() ?? "light";

  // Get a color from the current theme
  const getColor = (colorName: ColorName) => {
    return Colors[colorScheme][colorName];
  };

  // Get a color from a specific theme
  const getThemeColor = (theme: "light" | "dark", colorName: ColorName) => {
    return Colors[theme][colorName];
  };

  // Get a color directly from the palette
  const getPaletteColor = (colorName: keyof typeof palette) => {
    return palette[colorName];
  };

  // Check if the current theme is dark
  const isDarkMode = colorScheme === "dark";

  // Get the current theme name
  const themeName = colorScheme;

  // Get all colors for the current theme
  const themeColors = Colors[colorScheme];

  return {
    colors: themeColors,
    getColor,
    getThemeColor,
    getPaletteColor,
    isDarkMode,
    themeName,
    palette,
  };
}
