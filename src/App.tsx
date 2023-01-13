import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { SpotlightActions } from './stores/SpotlightActions';
import { AuthProvider } from './util/AuthProvider';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [_scrollock] = useScrollLock(true);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <AuthProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <SpotlightProvider
            shortcut={['mod + K']}
            actions={SpotlightActions}
            searchIcon={<IconSearch size={18} />}
            searchPlaceholder="Search..."
            nothingFoundMessage="Nothing found..."
          >
            <RouterProvider router={router} />
          </SpotlightProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  );
}
