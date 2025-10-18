// components/ThemedButton.tsx
import { Colors } from "@/constants/Colors";
import "@/global.css";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  type?: "solid" | "outline" | "gradient";
  lightColor?: string;
  darkColor?: string;
  lightBgColor?: string;
  darkBgColor?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

export function ThemedButton({
  title,
  type = "solid",
  lightColor,
  darkColor,
  lightBgColor,
  darkBgColor,
  className = "",
  size = "md",
  disabled = false,
  onPress,
  ...rest
}: ThemedButtonProps) {
  const { colorScheme } = useColorScheme();

  // Obtener clases base según tipo y tamaño
  const getTypeClasses = () => {
    const sizeClasses = {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    };

    const baseSize = sizeClasses[size];

    switch (type) {
      case "solid":
        return `${baseSize} bg-[${Colors.primary}] rounded-lg`;
      case "outline":
        return `${baseSize} border-2 border-[${Colors.accent}] rounded-lg`;
      case "gradient":
        return `${baseSize} rounded-lg`;
      default:
        return baseSize;
    }
  };

  // Obtener estilos dinámicos
  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: Colors.disabled,
        opacity: 0.6,
      };
    }

    if (type === "solid") {
      return {
        backgroundColor:
          colorScheme === "dark"
            ? darkBgColor || Colors.primary
            : lightBgColor || Colors.primary,
      };
    }

    if (type === "outline") {
      return {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor:
          colorScheme === "dark"
            ? darkColor || Colors.accent
            : lightColor || Colors.accent,
      };
    }

    return {};
  };

  // Obtener color del texto
  const getTextColor = () => {
    if (type === "outline") {
      return colorScheme === "dark"
        ? darkColor || Colors.accent
        : lightColor || Colors.accent;
    }
    return Colors.secondary;
  };

  const buttonStyle = getButtonStyle();
  const textColor = getTextColor();

  // Para gradiente
  if (type === "gradient") {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          disabled && { opacity: 0.6 },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          {...rest}
        >
          <Text style={[styles.buttonText, { color: "#ffffff" }]}>
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});