import { Stack, router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsTab() {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();

  const navigateToThemeSettings = () => {
    router.push("/settings");
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Settings", headerShown: true }} />

      {/* User Profile Section */}
      <ThemedView backgroundColor="card" style={styles.profileCard}>
        <IconSymbol
          size={60}
          name="person.circle.fill"
          color={colors.tint}
          style={styles.profileIcon}
        />
        <ThemedText type="subtitle">{user?.name || "User"}</ThemedText>
      </ThemedView>

      {/* Settings Options */}
      <ThemedView style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, { borderColor: colors.border }]}
          onPress={navigateToThemeSettings}
        >
          <View style={styles.optionContent}>
            <IconSymbol
              size={24}
              name="paintbrush.fill"
              color={colors.icon}
              style={styles.optionIcon}
            />
            <ThemedText>Appearance</ThemedText>
          </View>
          <IconSymbol size={20} name="chevron.right" color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { borderColor: colors.border }]}
          onPress={signOut}
        >
          <View style={styles.optionContent}>
            <IconSymbol
              size={24}
              name="rectangle.portrait.and.arrow.right"
              color={colors.error}
              style={styles.optionIcon}
            />
            <ThemedText color="error">Sign Out</ThemedText>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    alignItems: "center",
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  profileIcon: {
    marginBottom: 12,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 12,
  },
});
