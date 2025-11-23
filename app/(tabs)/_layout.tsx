// app/(tabs)/_layout.tsx
import { getVisibleTabs } from '@/config/tabs.config';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { hasPermission, isAuthenticated } = useAuth();

  // Filtrar tabs basado en permisos del usuario
  const visibleTabs = useMemo(() => {
    if (!isAuthenticated) {
      return [];
    }
    return getVisibleTabs(hasPermission);
  }, [hasPermission, isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffffff",
        tabBarInactiveTintColor: Colors.bg_dark_secondary,
        tabBarBackground: () => null,
        tabBarActiveBackgroundColor: Colors.bg_dark,
        tabBarItemStyle: {
          marginHorizontal: 4,
          borderRadius: 16,
          overflow: 'hidden', // Importante para que el borderRadius funcione
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.bg_light_secondary,
            borderTopWidth: 0,
            elevation: 0,
            height: 88,
            paddingTop: 8,
          },
          default: {
            position: 'absolute',
            backgroundColor: Colors.bg_light_secondary,
            borderTopWidth: 0,
            elevation: 8,
            height: 65,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }
        }),
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 12 : 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "transparent",
        },
      }}
    >
      {visibleTabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                focused={focused}
                color={color}
                size={20}
                name={icon as keyof typeof Ionicons.glyphMap}
              />
            ),
          }}
        />
      ))}

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}