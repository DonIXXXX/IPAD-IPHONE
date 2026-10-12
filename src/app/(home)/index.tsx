import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { IconBadge } from '@/components/icon-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { ISSUES } from '@/data/issues';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <ThemedText themeColor="textSecondary">What’s wrong with your device? Pick a problem to get step-by-step help.</ThemedText>

        <View style={styles.grid}>
          {ISSUES.map((issue) => (
            <View key={issue.id} style={styles.cardWrapper}>
              <Link href={{ pathname: '/issue/[id]', params: { id: issue.id } }} asChild>
                <Pressable style={({ pressed }) => pressed && styles.pressed}>
                  <ThemedView type="backgroundElement" style={styles.card}>
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
                  </ThemedView>
                </Pressable>
              </Link>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Spacing.six,
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.three,
    gap: Spacing.three,
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
    padding: Spacing.three,
    borderRadius: Spacing.three,
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
  },
});
