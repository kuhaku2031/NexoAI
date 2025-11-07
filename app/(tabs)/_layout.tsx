// app/(tabs)/_layout.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {

  const tabsConfig: {
    name: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
      {
        name: 'chat/index',
        title: 'Chat',
        icon: 'chatbubbles-outline',
      },
      {
        name: 'products/index',
        title: 'Products',
        icon: 'pricetags-outline',
      },
      {
        name: 'dashboard/index',
        title: 'Dashboard',
        icon: 'grid-outline',
      },
      {
        name: 'pos/index',
        title: 'POS',
        icon: 'calculator-outline',
      },
      {
        name: 'profile/index',
        title: 'Profile',
        icon: 'person-outline',
      },
    ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffffff",
        tabBarInactiveTintColor: Colors.bg_dark_secondary,
        tabBarActiveBackgroundColor: Colors.bg_dark,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.bg_light_secondary,
            borderTopWidth: 0,
            elevation: 0,
            height: 88,
            paddingBottom: 28,
            paddingTop: 8,
          },
          default: {
            position: 'absolute',
            backgroundColor: Colors.bg_light_secondary,
            borderTopWidth: 0,
            elevation: 8,
            height: 65,
            paddingBottom: 12,
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
           },
      }}
    >
      {tabsConfig.map(({ name, title, icon}) => (
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
                name={icon}
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