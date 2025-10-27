// components/AnimatedTabBarIcon.tsx - Versión con más opciones
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface AnimatedTabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  iconFocused: keyof typeof Ionicons.glyphMap;
  iconUnfocused: keyof typeof Ionicons.glyphMap;
  animationType?: 'bounce' | 'slide' | 'scale' | 'rotate';
}

export function AnimatedTabBarIcon({
  focused,
  color,
  size,
  iconFocused,
  iconUnfocused,
  animationType = 'bounce',
}: AnimatedTabBarIconProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    switch (animationType) {
      case 'bounce':
        // Animación de rebote
        if (focused) {
          scale.value = withSequence(
            withSpring(1.3, { damping: 5 }),
            withSpring(1.2, { damping: 10 })
          );
          translateY.value = withSpring(-5);
        } else {
          scale.value = withSpring(1);
          translateY.value = withSpring(0);
        }
        break;

      case 'slide':
        // Animación de deslizamiento
        if (focused) {
          translateY.value = withSpring(-8, { damping: 12 });
        } else {
          translateY.value = withSpring(0);
        }
        break;

      case 'scale':
        // Animación de escala simple
        if (focused) {
          scale.value = withTiming(1.25, { duration: 200 });
        } else {
          scale.value = withTiming(1, { duration: 200 });
        }
        break;

      case 'rotate':
        // Animación de rotación
        if (focused) {
          rotate.value = withSpring(360);
          scale.value = withSpring(1.2);
        } else {
          rotate.value = withSpring(0);
          scale.value = withSpring(1);
        }
        break;
    }
  }, [focused, animationType]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={focused ? iconFocused : iconUnfocused}
        size={size}
        color={color}
      />
    </Animated.View>
  );
}