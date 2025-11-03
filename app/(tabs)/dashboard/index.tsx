import { StyleSheet, View } from 'react-native';

import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';

export default function DashboardScreen() {
  return (
    <SafeScreen scrollable={true} contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" >Dashboard</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome back! Here's your business overview.</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
