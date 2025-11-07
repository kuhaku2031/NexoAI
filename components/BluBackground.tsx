// components/BlurTabBarBackground.tsx
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';

export function BlurTabBarBackground() {
  // En Android, usa un fondo semitransparente blanco
  if (Platform.OS === 'android') {
    return (
      <View 
        style={[
          StyleSheet.absoluteFill, 
          { 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }
        ]} 
      />
    );
  }
  
  // En iOS, usa BlurView con un fondo semitransparente
  return (
    <BlurView
      tint="light"
      intensity={100}
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }
      ]}
    />
  );
}