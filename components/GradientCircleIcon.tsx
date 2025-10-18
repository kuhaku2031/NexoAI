// components/GradientCircleIcon.tsx
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface GradientCircleIconProps {
  iconName: any;
  iconSize?: number;
  gradientColors?: any;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  iconColor?: string;
  circleSize?: number;
}

export function GradientCircleIcon({
  iconName,
  iconSize = 30,
  gradientColors = [Colors.primary, Colors.accent],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  iconColor = "",
  circleSize = 80,
}: GradientCircleIconProps) {
  return (
    <LinearGradient
      colors={gradientColors}
      start={start}
      end={end}
      style={[
        styles.gradientContainer,
        {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});