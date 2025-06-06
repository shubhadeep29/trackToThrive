/**
 * App color palette definition
 * This file serves as the single source of truth for all colors in the app
 */

// Base palette - raw color values
const palette = {
  // Primary colors
  primary50: "#e6f7fc",
  primary100: "#cceff9",
  primary200: "#99dff3",
  primary300: "#66cfed",
  primary400: "#33bfe7",
  primary500: "#0a7ea4", // Main primary color
  primary600: "#086583",
  primary700: "#064c62",
  primary800: "#043241",
  primary900: "#021921",

  // Neutrals
  neutral50: "#f8f9fa",
  neutral100: "#f1f3f5",
  neutral200: "#e9ecef",
  neutral300: "#dee2e6",
  neutral400: "#ced4da",
  neutral500: "#adb5bd",
  neutral600: "#6c757d",
  neutral700: "#495057",
  neutral800: "#343a40",
  neutral900: "#212529",

  // Semantic colors
  success: "#28a745",
  warning: "#ffc107",
  error: "#dc3545",
  info: "#17a2b8",

  // Fixed colors
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
};

// Functional color mapping
export const Colors = {
  light: {
    // Text
    text: palette.neutral900,
    textSecondary: palette.neutral700,
    textTertiary: palette.neutral600,
    textInverse: palette.white,

    // Background
    background: palette.white,
    backgroundSecondary: palette.neutral100,
    backgroundTertiary: palette.neutral200,

    // Brand
    tint: palette.primary500,

    // UI Elements
    card: palette.white,
    border: palette.neutral300,
    input: palette.white,
    inputBorder: palette.neutral400,

    // Tab bar
    tabIconDefault: palette.neutral600,
    tabIconSelected: palette.primary500,
    tabBar: palette.white,

    // Status
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,

    // Icons
    icon: palette.neutral700,
    iconSecondary: palette.neutral500,
  },
  dark: {
    // Text
    text: palette.neutral100,
    textSecondary: palette.neutral300,
    textTertiary: palette.neutral400,
    textInverse: palette.neutral900,

    // Background
    background: palette.neutral900,
    backgroundSecondary: palette.neutral800,
    backgroundTertiary: palette.neutral700,

    // Brand
    tint: palette.primary300,

    // UI Elements
    card: palette.neutral800,
    border: palette.neutral700,
    input: palette.neutral800,
    inputBorder: palette.neutral600,

    // Tab bar
    tabIconDefault: palette.neutral400,
    tabIconSelected: palette.primary300,
    tabBar: palette.neutral900,

    // Status
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,

    // Icons
    icon: palette.neutral300,
    iconSecondary: palette.neutral500,
  },
};

// Export the raw palette for direct access when needed
export { palette };

// Type definitions for type safety
export type ColorTheme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;
