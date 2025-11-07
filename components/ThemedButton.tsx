// components/ThemedButton.tsx
import { Colors } from "@/constants/Colors";
import "@/global.css";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { useState } from "react";
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
  const [isPressed, setIsPressed] = useState(false);

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
        backgroundColor: isPressed ? Colors.accent : "transparent",
        borderWidth: 2,
        borderColor:
          colorScheme === "dark"
            ? darkColor || Colors.accent
            : lightColor || Colors.accent,
      };
    }

    return {};
  };

  const getTextColor = () => {
    if (type === "outline") {
      // Si está presionado, el texto es del color primario
      if (isPressed) {
        return Colors.primary;
      }
      return colorScheme === "dark"
        ? darkColor || Colors.accent
        : lightColor || Colors.accent;
    }
    return Colors.secondary;
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };


  const buttonStyle = getButtonStyle();
  const textColor = getTextColor();

  // Para gradiente
  if (type === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...rest}
      >
        <LinearGradient
          colors={[Colors.bg_dark, Colors.bg_dark_secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            disabled && { opacity: 0.6 },
          ]}
        >

          <Text style={[styles.buttonText, { color: "#ffffff" }]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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