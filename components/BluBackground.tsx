// components/BlurTabBarBackground.tsx
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

export function BlurTabBarBackground() {
  return (
    <View style={styles.background}>
    <BlurView
      intensity={70} 
      style={styles.blurContainer}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
    flex: 1,
  },
    blurContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
});