import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [_scrollock] = useScrollLock(true);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
