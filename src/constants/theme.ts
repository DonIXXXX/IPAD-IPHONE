/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/** The app always uses the ocean-teal glass look, in both light and dark mode. */
const Ocean = {
  text: '#ffffff',
  background: '#023E4A',
  backgroundElement: 'rgba(255, 255, 255, 0.10)',
  backgroundSelected: 'rgba(255, 255, 255, 0.22)',
  textSecondary: 'rgba(255, 255, 255, 0.72)',
} as const;

export const Colors = {
  light: Ocean,
  dark: Ocean,
} as const;

/** Background gradient, top-left to bottom-right. */
export const BackgroundGradient = ['#023E4A', '#04566B', '#0B5394'] as const;

/** Frosted-glass card styling. */
export const Glass = {
  border: 'rgba(255, 255, 255, 0.20)',
  shine: ['rgba(255, 255, 255, 0.22)', 'rgba(255, 255, 255, 0)'] as const,
};

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
/** On web the tab bar floats over the top of the page. */
export const WebTabBarInset = Platform.OS === 'web' ? 72 : 0;
export const MaxContentWidth = 800;
