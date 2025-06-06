import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";

export default function SettingsScreen() {
  const { theme, setTheme, isSystemTheme } = useThemeContext();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Settings", headerShown: true }} />
      <ThemedView style={styles.container}>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Appearance
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.option,
              isSystemTheme && styles.selectedOption,
              { borderColor: colors.border },
            ]}
            onPress={() => setTheme("system")}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="gear"
                color={colors.icon}
                style={styles.optionIcon}
              />
              <ThemedText>System</ThemedText>
            </View>
            {isSystemTheme && (
              <IconSymbol size={20} name="checkmark" color={colors.tint} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              theme === "light" && !isSystemTheme && styles.selectedOption,
              { borderColor: colors.border },
            ]}
            onPress={() => setTheme("light")}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="sun.max.fill"
                color={colors.icon}
                style={styles.optionIcon}
              />
              <ThemedText>Light</ThemedText>
            </View>
            {theme === "light" && !isSystemTheme && (
              <IconSymbol size={20} name="checkmark" color={colors.tint} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              theme === "dark" && !isSystemTheme && styles.selectedOption,
              { borderColor: colors.border },
            ]}
            onPress={() => setTheme("dark")}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="moon.fill"
                color={colors.icon}
                style={styles.optionIcon}
              />
              <ThemedText>Dark</ThemedText>
            </View>
            {theme === "dark" && !isSystemTheme && (
              <IconSymbol size={20} name="checkmark" color={colors.tint} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Current Theme
          </ThemedText>
          <ThemedView
            backgroundColor="backgroundSecondary"
            style={styles.themeInfo}
          >
            <ThemedText>
              {isSystemTheme
                ? `System (currently ${theme})`
                : theme.charAt(0).toUpperCase() + theme.slice(1)}
            </ThemedText>
          </ThemedView>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 12,
  },
  themeInfo: {
    padding: 16,
    borderRadius: 8,
  },
});
