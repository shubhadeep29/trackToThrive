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

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Attempting signup with:", {
        email,
        name,
        passwordLength: password.length,
      });
      await signUp(email, password, name);
      setSuccess(
        "Account created! Please check your email to confirm your account."
      );
    } catch (error: any) {
      console.error("Registration error:", error);
      // More detailed error reporting
      let errorMessage = "Registration failed. Please try again.";

      if (error?.message) {
        errorMessage = error.message;
      }

      if (error?.name === "AuthApiError") {
        errorMessage = `Auth Error: ${error.message}`;
      }

      console.log("Error details:", {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        code: error?.code,
      });

      setError(errorMessage);
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
        <ThemedText type="title">Create Account</ThemedText>
        <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

        <TextInput
          style={inputStyle}
          placeholder="Full Name"
          placeholderTextColor={colors.textTertiary}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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

        {success ? (
          <ThemedText style={styles.successText} color="success">
            {success}
          </ThemedText>
        ) : null}

        <TouchableOpacity
          style={buttonStyle}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.buttonText}>Create Account</ThemedText>
          )}
        </TouchableOpacity>

        <Link href="/login" style={styles.link}>
          <ThemedText type="link">Already have an account? Sign in</ThemedText>
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
    padding: 20,
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
  successText: {
    marginBottom: 10,
    textAlign: "center",
  },
});
