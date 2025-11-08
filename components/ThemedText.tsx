import { Colors } from "@/constants/Colors";
import "@/global.css";
import { useColorScheme } from "nativewind";
import { Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

export function ThemedText({
  lightColor,
  darkColor,
  type = "default",
  className = "",
  style = "",
  ...rest
}: ThemedTextProps) {
  const { colorScheme } = useColorScheme();

  // Clases base para cada tipo
  const getTypeClasses = () => {
    switch (type) {
      case "title":
        return "text-3xl font-bold leading-8";
      case "subtitle":
        return "text-xl font-bold leading-6";
      case "defaultSemiBold":
        return "text-base font-semibold leading-6";
      case "link":
        return `text-base leading-7 text-[${Colors.primary}] underline`;
      default:
        return "text-base leading-6";
    }
  };

  const typeClasses = getTypeClasses();
  const finalClassName = [typeClasses, className]
    .filter(Boolean).join(" ");

  return (
    <Text
      className={finalClassName}
      style={[style]}
      {...rest}
    />
  );
}
