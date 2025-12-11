import { useState, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  View,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { KeyboardAwareView } from "@/components/KeyboardAwareView";
import { useTheme } from "@/hooks/useTheme";
import { Eye, EyeSlash } from "phosphor-react-native";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signIn(email, password);
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize style objects to prevent unnecessary re-renders
  const inputStyle = useMemo(
    () => [
      styles.input,
      {
        backgroundColor: colors.input,
        borderColor: colors.inputBorder,
        color: colors.text,
      },
    ],
    [colors.input, colors.inputBorder, colors.text]
  );

  const passwordInputStyle = useMemo(
    () => [
      styles.passwordInput,
      {
        backgroundColor: colors.input,
        borderColor: colors.inputBorder,
        color: colors.text,
      },
    ],
    [colors.input, colors.inputBorder, colors.text]
  );

  const buttonStyle = useMemo(
    () => [styles.button, { backgroundColor: colors.tint }],
    [colors.tint]
  );

  return (
    <KeyboardAwareView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Welcome</ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>

        <TextInput
          style={inputStyle}
          placeholder="Email"
          placeholderTextColor={colors.textTertiary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={passwordInputStyle}
            placeholder="Password"
            placeholderTextColor={colors.textTertiary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeSlash size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>

        {error ? (
          <ThemedText style={styles.errorText} color="error">
            {error}
          </ThemedText>
        ) : null}

        <TouchableOpacity
          style={buttonStyle}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.buttonText}>Sign In</ThemedText>
          )}
        </TouchableOpacity>

        <Link href="/register" style={styles.link}>
          <ThemedText type="link">Don't have an account? Create one</ThemedText>
        </Link>
      </ThemedView>
    </KeyboardAwareView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    padding: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
  },
  errorText: {
    marginBottom: 10,
  },
});
