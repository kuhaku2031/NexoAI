// components/SafeScreen.tsx
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { Animated, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  backgroundColor?: string;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  centered?: boolean;
}

export function SafeScreen({
  children,
  style,
  edges = ['top', 'bottom'],
  backgroundColor = Colors.bg_light_secondary,
  scrollable = false,
  contentContainerStyle,
  centered = false,
}: SafeScreenProps) {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        centered && styles.centered,
        contentContainerStyle
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : children;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }, style]}
      edges={edges}
    >
      <Animated.ScrollView>
        {content}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  centered: {
    justifyContent: 'center',
  },
});