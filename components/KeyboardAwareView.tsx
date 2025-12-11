import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface Props extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
  scrollViewProps?: ScrollViewProps;
}

export function KeyboardAwareView({
  children,
  style,
  scrollViewProps,
  ...props
}: Props) {
  const { colors } = useTheme();
  const statusBarHeight = StatusBar.currentHeight || 0;

  // Memoize the safe area style to prevent unnecessary re-renders
  const safeAreaStyle = useMemo(
    () => [
      styles.safeArea,
      {
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
      },
    ],
    [colors.background, statusBarHeight]
  );

  return (
    <SafeAreaView style={safeAreaStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, style]}
        {...props}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Uncomment to see the safe area boundaries
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
