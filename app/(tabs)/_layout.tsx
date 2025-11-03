// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';

import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';

const tabsConfig: {
  name: string;
  title: string;
  iconFocused: any; 
  iconUnfocused: any;
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
    <NativeTabs>
      {tabsConfig.map((tab) => (
        <NativeTabs.Trigger name={tab.name}>
             <NativeTabs.Trigger.TabBar/>
                <NativeTabs.Trigger.TabBar backgroundColor={""} blurEffect='light'/>
                <Label>{tab.title}</Label>
                <Icon src={{ default: <VectorIcon family={Ionicons} name={tab.iconUnfocused}/>, selected: <VectorIcon family={Ionicons} name={tab.iconUnfocused}/> }}/>
       </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}