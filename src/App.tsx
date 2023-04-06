import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useColorScheme, useScrollLock } from '@mantine/hooks';
import { SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { SpotlightActions } from './stores/SpotlightActions';
import { queryClient } from './lib/react-query';
import { Notifications } from '@mantine/notifications';

export default function App() {
  const preferredColorScheme = useColorScheme('dark');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [_scrollock] = useScrollLock(true);

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <SpotlightProvider
            shortcut={['mod + K']}
            actions={SpotlightActions}
            searchIcon={<IconSearch size={18} />}
            searchPlaceholder="Search..."
            nothingFoundMessage="Nothing found...">
            <Notifications position="bottom-right" />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </SpotlightProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}
