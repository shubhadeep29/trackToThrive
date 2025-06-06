import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";
import { Colors, ColorTheme } from "@/constants/Colors";
import { secureStorage } from "@/utils/secureStorage";

type ThemeContextType = {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme | "system") => void;
  isSystemTheme: boolean;
  colors: typeof Colors.light | typeof Colors.dark;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "user_theme_preference";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme() ?? "light";
  const [themePreference, setThemePreference] = useState<ColorTheme | "system">(
    "system"
  );

  // The actual theme is either the user preference or the system theme
  const actualTheme: ColorTheme =
    themePreference === "system" ? systemColorScheme : themePreference;

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await secureStorage.getItem(THEME_STORAGE_KEY);
      if (
        savedTheme &&
        (savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "system")
      ) {
        setThemePreference(savedTheme as ColorTheme | "system");
      }
    };

    loadThemePreference();
  }, []);

  // Set theme and save preference
  const setTheme = async (newTheme: ColorTheme | "system") => {
    setThemePreference(newTheme);
    await secureStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: actualTheme,
        setTheme,
        isSystemTheme: themePreference === "system",
        colors: Colors[actualTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
