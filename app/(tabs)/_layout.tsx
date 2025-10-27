// app/(tabs)/_layout.tsx
import { AnimatedTabBarIcon } from '@/components/AnimatedTabBarIcon';
import { BlurTabBarBackground } from '@/components/BluBackground';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

const tabsConfig: {
  name: string;
  title: string;
  iconFocused: keyof typeof Ionicons.glyphMap;
  iconUnfocused: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: 'chat/index',
    title: 'Chat',
    iconFocused: 'chatbubbles',
    iconUnfocused: 'chatbubbles-outline',
  },
  {
    name: 'products/index',
    title: 'Products',
    iconFocused: 'pricetags',
    iconUnfocused: 'pricetags-outline',
  },
  {
    name: 'dashboard/index',
    title: 'Dashboard',
    iconFocused: 'grid',
    iconUnfocused: 'grid-outline',
  },
  {
    name: 'pos/index',
    title: 'POS',
    iconFocused: 'calculator',
    iconUnfocused: 'calculator-outline',
  },
  {
    name: 'profile/index',
    title: 'Profile',
    iconFocused: 'person',
    iconUnfocused: 'person-outline',
  },
];

export default function TabLayoutWithIcons() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          position: 'absolute', // Importante para el efecto glass
          backgroundColor: 'transparent', // Fondo transparente para ver el blur
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          // Borde sutil para el efecto glass
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          // Sombra más suave
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          paddingHorizontal: 8,
          overflow: 'hidden', // Importante para los bordes redondeados
        },
        tabBarBackground: () => <BlurTabBarBackground />,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarButton: (props) => {
          const { children, onPress, accessibilityState, ref, ...otherProps } = props as any;
          const focused = accessibilityState?.selected;
          
          return (
            <Pressable
              ref={ref as any}
              {...(otherProps as any)}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // Efecto glass también en el botón activo
                backgroundColor: focused 
                  ? 'rgba(3, 4, 94, 0.15)' // Color con transparencia
                  : 'transparent',
                borderRadius: 16,
                marginHorizontal: 4,
                paddingVertical: 8,
                borderWidth: focused ? 1 : 0,
                borderColor: focused ? 'rgba(3, 4, 94, 0.3)' : 'transparent',
                ...(focused && {
                  shadowColor: Colors.accent,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }),
              }}
            >
              {children}
            </Pressable>
          );
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      {tabsConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused, size }) => (
              <AnimatedTabBarIcon
                focused={focused}
                color={color}
                size={size}
                iconFocused={tab.iconFocused}
                iconUnfocused={tab.iconUnfocused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}