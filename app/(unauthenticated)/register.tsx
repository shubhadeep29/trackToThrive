import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RegisterScreen() {
  const { signIn } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Account</ThemedText>
      <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

      {/* Add your registration form here */}

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <ThemedText style={styles.buttonText}>Create Account</ThemedText>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        <ThemedText type="link">Already have an account? Sign in</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
  },
});
