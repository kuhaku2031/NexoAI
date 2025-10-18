// components/DividerWithText.tsx
import { Colors, ComponentColors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

interface DividerWithTextProps {
  text: string;
  textColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  marginVertical?: number;
}

export function DividerWithText({
  text,
  textColor = Colors.secondary,
  lineColor = ComponentColors.input.border,
  backgroundColor = "#ffffff",
}: DividerWithTextProps) {
  return (
    <View style={[styles.container]}>
      {/* Línea de fondo */}
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      
      {/* Texto centrado con fondo */}
      <View style={styles.centerContainer}>
        <View style={[styles.textWrapper, { backgroundColor }]}>
          <Text style={[styles.text, { color: textColor }]}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  centerContainer: {
    alignItems: 'center',
  },
  textWrapper: {
    paddingHorizontal: 16,
    zIndex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});