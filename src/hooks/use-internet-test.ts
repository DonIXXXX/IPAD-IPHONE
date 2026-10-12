import { useCallback, useEffect, useState } from 'react';

const TEST_URL = 'https://www.apple.com/library/test/success.html';
const TIMEOUT_MS = 8000;

export type InternetTest = { state: 'running' } | { state: 'ok'; ms: number } | { state: 'failed' };

/** Loads a small page from the internet and measures how long it takes. */
async function measure(): Promise<InternetTest> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = Date.now();
  try {
    const response = await fetch(`${TEST_URL}?t=${start}`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    return response.ok ? { state: 'ok', ms: Date.now() - start } : { state: 'failed' };
  } catch {
    return { state: 'failed' };
  } finally {
    clearTimeout(timer);
  }
}

/** Runs an internet test on mount; call `run` to test again. */
export function useInternetTest() {
  const [result, setResult] = useState<InternetTest>({ state: 'running' });

  useEffect(() => {
    let active = true;
    measure().then((r) => active && setResult(r));
    return () => {
      active = false;
    };
  }, []);

  const run = useCallback(() => {
    setResult({ state: 'running' });
    measure().then(setResult);
  }, []);

  return { result, run };
}
