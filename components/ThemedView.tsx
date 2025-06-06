import { View, type ViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export type ThemedViewProps = ViewProps & {
  backgroundColor?: keyof ReturnType<typeof useTheme>["colors"];
};

export function ThemedView({
  style,
  backgroundColor = "background",
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors[backgroundColor] }, style]}
      {...otherProps}
    />
  );
}
