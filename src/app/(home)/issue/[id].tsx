import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PerformanceCheck } from '@/components/checks/performance-check';
import { WifiCheck } from '@/components/checks/wifi-check';
import { IconBadge } from '@/components/icon-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getIssue } from '@/data/issues';
import { useTheme } from '@/hooks/use-theme';

const SUPPORT_URL = 'https://support.apple.com/contact';

export default function IssueScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const issue = getIssue(id);
  const theme = useTheme();
  const [done, setDone] = useState<Set<number>>(new Set());
  const [fixed, setFixed] = useState(false);

  if (!issue) {
    return (
      <ThemedView style={styles.missing}>
        <ThemedText>Guide not found.</ThemedText>
      </ThemedView>
    );
  }

  const toggleStep = (index: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: issue.title }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <IconBadge icon={issue.icon} color={issue.color} size={56} />
          <View style={styles.headerText}>
            <ThemedText type="subtitle">{issue.title}</ThemedText>
            <ThemedText themeColor="textSecondary">{issue.subtitle}</ThemedText>
          </View>
        </View>

        {issue.note && (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="small">{issue.note}</ThemedText>
          </ThemedView>
        )}

        {issue.check && (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Live check</ThemedText>
            {issue.check === 'wifi' && <WifiCheck />}
            {issue.check === 'performance' && <PerformanceCheck />}
          </ThemedView>
        )}

        {issue.test && (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Hands-on test</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {issue.test === 'camera'
                ? 'See a live preview from the front and back cameras.'
                : 'Draw on a pad to check the Pencil is detected and smooth.'}
            </ThemedText>
            <Button title="Open test" color={issue.color} onPress={() => router.push(issue.test === 'camera' ? '/test/camera' : '/test/pen')} />
          </ThemedView>
        )}

        <ThemedText type="smallBold" style={styles.sectionTitle}>
          Try these steps in order — tap each one when done
        </ThemedText>

        {issue.steps.map((step, index) => {
          const isDone = done.has(index);
          return (
            <Pressable
              key={step.title}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isDone }}
              onPress={() => toggleStep(index)}
              style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={[styles.step, isDone && styles.stepDone]}>
                <View style={[styles.stepNumber, { borderColor: issue.color }, isDone && { backgroundColor: issue.color }]}>
                  {isDone ? (
                    <SymbolView
                      name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                      tintColor="#ffffff"
                      size={14}
                    />
                  ) : (
                    <ThemedText type="smallBold" style={{ color: issue.color }}>
                      {index + 1}
                    </ThemedText>
                  )}
                </View>
                <View style={styles.stepText}>
                  <ThemedText type="smallBold" style={styles.stepTitle}>
                    {step.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {step.detail}
                  </ThemedText>
                </View>
              </ThemedView>
            </Pressable>
          );
        })}

        <ThemedView type="backgroundElement" style={styles.card}>
          {fixed ? (
            <ThemedText style={styles.center}>Great — glad it’s working again!</ThemedText>
          ) : (
            <>
              <ThemedText type="smallBold" style={styles.center}>
                Did this fix the problem?
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.flex}>
                  <Button title="Yes, fixed" color="#30A46C" onPress={() => setFixed(true)} />
                </View>
                <View style={styles.flex}>
                  <Button
                    title="Still broken"
                    variant="tinted"
                    color="#E5484D"
                    onPress={() => WebBrowser.openBrowserAsync(SUPPORT_URL)}
                  />
                </View>
              </View>
              <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
                “Still broken” opens Apple Support.
              </ThemedText>
            </>
          )}
        </ThemedView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  headerText: {
    flex: 1,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  stepDone: {
    opacity: 0.6,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    gap: Spacing.one,
  },
  stepTitle: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  flex: {
    flex: 1,
  },
  center: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
