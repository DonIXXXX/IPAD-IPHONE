import { DarkTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { BackgroundGradient } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const OceanTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#5EEAD4',
    background: BackgroundGradient[0],
    card: BackgroundGradient[0],
  },
};

export default function TabLayout() {
  return (
    <ThemeProvider value={OceanTheme}>
      <StatusBar style="light" />
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
