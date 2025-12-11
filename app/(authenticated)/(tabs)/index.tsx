import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { KeyboardAwareView } from "@/components/KeyboardAwareView";
import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();

  return (
    <KeyboardAwareView>
      <ThemedView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <ThemedText type="title">Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>
              {user?.name || "User"}
            </ThemedText>
          </View>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: colors.backgroundSecondary },
            ]}
            onPress={signOut}
          >
            <IconSymbol
              size={24}
              name="rectangle.portrait.and.arrow.right"
              color={colors.tint}
            />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <ThemedView
            backgroundColor="card"
            style={[styles.statsCard, { borderColor: colors.border }]}
          >
            <ThemedText type="title">0</ThemedText>
            <ThemedText style={styles.cardLabel}>Total Tasks</ThemedText>
          </ThemedView>

          <ThemedView
            backgroundColor="card"
            style={[styles.statsCard, { borderColor: colors.border }]}
          >
            <ThemedText type="title">0</ThemedText>
            <ThemedText style={styles.cardLabel}>Completed</ThemedText>
          </ThemedView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quick Actions
          </ThemedText>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
          >
            <ThemedText style={styles.buttonText}>Create New Task</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <ThemedText>View All Tasks</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAwareView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    marginTop: 5,
    opacity: 0.7,
  },
  iconButton: {
    padding: 12,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  statsCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  cardLabel: {
    marginTop: 8,
    opacity: 0.7,
  },
  actionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  actionButton: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
