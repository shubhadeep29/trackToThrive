import { ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";

export function AuthLoadingScreen() {
  const { colors } = useTheme();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.tint} />
      <ThemedText style={{ marginTop: 16 }}>Loading...</ThemedText>
    </ThemedView>
  );
}
