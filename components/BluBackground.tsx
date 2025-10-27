// components/BlurTabBarBackground.tsx
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export function BlurTabBarBackground() {
  return (
    <BlurView
      intensity={80} // Ajusta la intensidad del blur (0-100)
      tint="light" // 'light', 'dark', 'default'
      style={StyleSheet.absoluteFill}
    />
  );
}