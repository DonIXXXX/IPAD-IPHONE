import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconBadge } from '@/components/icon-badge';
import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { BottomTabInset, MaxContentWidth, Spacing, WebTabBarInset } from '@/constants/theme';
import { ISSUES } from '@/data/issues';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.four + WebTabBarInset,
            paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
          },
        ]}>
        <View style={styles.container}>
          <View style={styles.hero}>
            <Image source={require('@/assets/images/icon.png')} style={styles.appIcon} />
            <View style={styles.heroText}>
              <ThemedText type="subtitle" style={styles.heroTitle}>
                Device Helper
              </ThemedText>
              <ThemedText themeColor="textSecondary">
                What’s wrong with your device? Pick a problem for step-by-step help.
              </ThemedText>
            </View>
          </View>

          <View style={styles.grid}>
            {ISSUES.map((issue) => (
              <View key={issue.id} style={styles.cardWrapper}>
                <Link href={{ pathname: '/issue/[id]', params: { id: issue.id } }} asChild>
                  <Pressable style={({ pressed }) => pressed && styles.pressed}>
                    <GlassCard style={styles.card}>
                      <IconBadge icon={issue.icon} color={issue.color} />
                      <View style={styles.cardText}>
                        <ThemedText type="smallBold" style={styles.cardTitle}>
                          {issue.title}
                        </ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                          {issue.subtitle}
                        </ThemedText>
                      </View>
                      <SymbolView
                        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                        tintColor={theme.textSecondary}
                        size={14}
                      />
                    </GlassCard>
                  </Pressable>
                </Link>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  appIcon: {
    width: 68,
    height: 68,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  heroText: {
    flex: 1,
    gap: Spacing.one,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  cardWrapper: {
    flexGrow: 1,
    flexBasis: 320,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardText: {
    flex: 1,
    gap: Spacing.half,
  },
  cardTitle: {
    fontSize: 17,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
