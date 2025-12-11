import { useColorScheme } from "react-native";
import { useMemo, useCallback } from "react";
import { Colors, ColorName, palette } from "@/constants/Colors";

/**
 * A hook that provides easy access to the current theme colors
 * and utility functions for working with colors
 */
export function useTheme() {
  const colorScheme = useColorScheme() ?? "light";

  // Memoize the theme colors to prevent unnecessary re-renders
  const themeColors = useMemo(() => Colors[colorScheme], [colorScheme]);

  // Get a color from the current theme
  const getColor = useCallback(
    (colorName: ColorName) => {
      return Colors[colorScheme][colorName];
    },
    [colorScheme]
  );

  // Get a color from a specific theme
  const getThemeColor = useCallback(
    (theme: "light" | "dark", colorName: ColorName) => {
      return Colors[theme][colorName];
    },
    []
  );

  // Get a color directly from the palette
  const getPaletteColor = useCallback((colorName: keyof typeof palette) => {
    return palette[colorName];
  }, []);

  // Check if the current theme is dark
  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);

  // Get the current theme name
  const themeName = colorScheme;

  return useMemo(
    () => ({
      colors: themeColors,
      getColor,
      getThemeColor,
      getPaletteColor,
      isDarkMode,
      themeName,
      palette,
    }),
    [
      themeColors,
      getColor,
      getThemeColor,
      getPaletteColor,
      isDarkMode,
      themeName,
    ]
  );
}
