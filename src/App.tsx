import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useState } from 'react';
import ApplicationShell from './components/AppShell/ApplicationShell';
import TestConfig from './components/TestConfig/TestConfig';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [_scrollock, setScrollLock] = useScrollLock(true)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ApplicationShell>
          <TestConfig/>
        </ApplicationShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
