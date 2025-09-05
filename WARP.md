# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

LocalAI is an **Expo React Native** app built with **TypeScript** that supports iOS, Android, and Web platforms. It uses **Expo Router** for file-based navigation with a tab-based interface.

## Essential Commands

### Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm start
# or
npx expo start

# Platform-specific development
pnpm run android    # Start with Android emulator
pnpm run ios        # Start with iOS simulator  
pnpm run web        # Start web version

# Linting
pnpm run lint
# or
npx expo lint
```

### Project Management
```bash
# Reset project (moves current app to app-example and creates fresh app directory)
pnpm run reset-project
```

### Platform Testing
- Press `a` in terminal to open Android emulator
- Press `i` in terminal to open iOS simulator  
- Press `w` in terminal to open web version
- Press `r` to reload the app
- Press `m` to toggle the dev menu

## Architecture Overview

### File-Based Routing (Expo Router)
The app uses **Expo Router v5** with file-based routing:

- `app/_layout.tsx` - Root layout with navigation theme and font loading
- `app/(tabs)/_layout.tsx` - Tab navigation layout with bottom tabs
- `app/(tabs)/index.tsx` - Home screen (main tab)
- `app/(tabs)/explore.tsx` - Explore screen (second tab)  
- `app/+not-found.tsx` - 404/not found screen

Routes are automatically generated based on file structure in the `app/` directory.

### Component Architecture

#### Themed Components
- `components/ThemedText.tsx` - Text component with light/dark theme support
- `components/ThemedView.tsx` - View component with theme-aware styling
- Theme colors defined in `constants/Colors.ts`

#### UI Components  
- `components/ui/IconSymbol.tsx` - Cross-platform icon system using SF Symbols
- `components/ui/TabBarBackground.tsx` - Platform-specific tab bar styling
- `components/HapticTab.tsx` - Tab button with haptic feedback
- `components/ParallaxScrollView.tsx` - Scroll view with parallax header effect

#### Utility Components
- `components/Collapsible.tsx` - Collapsible content sections
- `components/ExternalLink.tsx` - Links that open externally
- `components/HelloWave.tsx` - Animated waving hand using react-native-reanimated

### Hooks
- `hooks/useColorScheme.ts` - Detects system light/dark mode preference
- `hooks/useThemeColor.ts` - Resolves colors based on current theme

### Key Technologies
- **Expo SDK 53** with React Native 0.79
- **React 19** with TypeScript 5.8
- **Expo Router 5** for navigation
- **React Navigation** (bottom tabs, native stack)
- **react-native-reanimated** for animations
- **react-native-gesture-handler** for gesture support
- **expo-symbols** for SF Symbols integration

### Configuration
- `app.json` - Expo app configuration
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` maps to `./`)
- `eslint.config.js` - ESLint configuration using expo/flat config
- **pnpm** for package management with workspace support

## Development Patterns

### Adding New Screens
1. Create new `.tsx` file in `app/` directory
2. Export default React component
3. File path becomes the route (e.g., `app/profile.tsx` → `/profile`)

### Using Themes
```tsx
import { ThemedText, ThemedView } from '@/components/Themed*';
import { useThemeColor } from '@/hooks/useThemeColor';

// Themed components automatically adapt to light/dark mode
<ThemedText type="title">Hello World</ThemedText>
<ThemedView style={{ flex: 1 }}>Content</ThemedView>
```

### Path Aliases
Use `@/` prefix to import from project root:
```tsx
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
```

### Platform-Specific Code
```tsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: Platform.select({
    ios: { paddingTop: 20 },
    android: { paddingTop: 0 },
    web: { paddingTop: 10 },
  }),
});
```

## Common Tasks

### Testing Different Platforms
The app supports three platforms. Test on all during development:
- **iOS**: Native iOS simulator experience
- **Android**: Native Android emulator experience  
- **Web**: Browser-based experience with Metro bundler

### Adding Icons
Use the `IconSymbol` component which provides SF Symbols on iOS and equivalent icons on other platforms:
```tsx
<IconSymbol size={24} name="house.fill" color="#000" />
```

### Debugging
- Use **Flipper** for React Native debugging
- **React DevTools** available in development builds
- **Expo DevTools** accessible via dev menu
- Platform-specific dev tools: Xcode (iOS), Android Studio (Android), Browser DevTools (Web)
