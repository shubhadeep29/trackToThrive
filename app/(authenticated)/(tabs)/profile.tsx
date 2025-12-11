import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { KeyboardAwareView } from "@/components/KeyboardAwareView";
import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            setIsSigningOut(true);
            await signOut();
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.");
            console.error("Sign out error:", error);
          } finally {
            setIsSigningOut(false);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAwareView>
      <ThemedView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <IconSymbol
            size={80}
            name="person.circle.fill"
            color={colors.tint}
            style={styles.profileIcon}
          />
          <ThemedText type="title" style={styles.name}>
            {user?.user_metadata?.full_name || user?.email || "User"}
          </ThemedText>
          {user?.email && (
            <ThemedText style={styles.email}>{user.email}</ThemedText>
          )}
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="person.fill"
                color={colors.icon}
                style={styles.optionIcon}
              />
              <View>
                <ThemedText type="defaultSemiBold">Edit Profile</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Update your personal information
                </ThemedText>
              </View>
            </View>
            <IconSymbol size={20} name="chevron.right" color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="gear"
                color={colors.icon}
                style={styles.optionIcon}
              />
              <View>
                <ThemedText type="defaultSemiBold">Settings</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  App preferences and settings
                </ThemedText>
              </View>
            </View>
            <IconSymbol size={20} name="chevron.right" color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
            onPress={handleSignOut}
            disabled={isSigningOut}
          >
            <View style={styles.optionContent}>
              <IconSymbol
                size={24}
                name="rectangle.portrait.and.arrow.right"
                color={colors.error}
                style={styles.optionIcon}
              />
              <View>
                <ThemedText color="error" type="defaultSemiBold">
                  Sign Out
                </ThemedText>
                <ThemedText style={styles.optionDescription} color="error">
                  Log out of your account
                </ThemedText>
              </View>
            </View>
            {isSigningOut && <ActivityIndicator color={colors.error} />}
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
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  profileIcon: {
    marginBottom: 16,
  },
  name: {
    textAlign: "center",
  },
  email: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionDescription: {
    opacity: 0.7,
    fontSize: 14,
  },
});
