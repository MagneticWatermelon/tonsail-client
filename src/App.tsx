import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  MantineProvider,
  Tuple
} from '@mantine/core';
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
        <MantineProvider
          theme={{
            components: {
              Input: {
                styles: (theme) => ({
                  input: {
                    '&:focus-within': { borderColor: theme.colors.limeZest[6] }
                  }
                })
              }
            },
            colorScheme,
            colors: {
              dark: [
                '#d5d7e0',
                '#acaebf',
                '#8c8fa3',
                '#666980',
                '#4d4f66',
                '#34354a',
                '#131c3b',
                '#0e152f',
                '#0c0d21',
                '#01010a'
              ],
              limeZest: [
                '#f1ffbd',
                '#eeffab',
                '#ebff97',
                '#e8ff82',
                '#e5ff69',
                '#e2ff49',
                '#dfff00',
                '#c2de00',
                '#a5be00',
                '#8a9e00'
              ],
              spaceCadet: [
                '#b4bac9',
                '#9ca4b8',
                '#6f7995',
                '#596484',
                '#445073',
                '#303c62',
                '#1e2952',
                '#131c3b',
                '#0e152f',
                '#05091a'
              ],
              oceanBlue: [
                '#7AD1DD',
                '#5FCCDB',
                '#44CADC',
                '#2AC9DE',
                '#1AC2D9',
                '#11B7CD',
                '#09ADC3',
                '#0E99AC',
                '#128797',
                '#147885'
              ],
              brightPink: [
                '#F0BBDD',
                '#ED9BCF',
                '#EC7CC3',
                '#ED5DB8',
                '#F13EAF',
                '#F71FA7',
                '#FF00A1',
                '#E00890',
                '#C50E82',
                '#AD1374'
              ]
            }
          }}
          withGlobalStyles
          withNormalizeCSS>
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

type ExtendedCustomColors =
  | 'spaceCadet'
  | 'limeZest'
  | 'brightPink'
  | 'oceanBlue'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
