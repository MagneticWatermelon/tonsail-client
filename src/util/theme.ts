import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

type ExtendedCustomColors =
  | 'spaceCadet'
  | 'limeZest'
  | 'wisteria'
  | 'dynamite'
  | 'slate'
  | 'blushBomb'
  | 'neonGreen'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
export const theme: MantineThemeOverride = {
  components: {
    Input: {
      styles: (theme) => ({
        input: {
          '&:focus-within': { borderColor: theme.colors.limeZest[6] }
        }
      })
    }
  },
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
    neonGreen: [
      '#c3ffba',
      '#b2ffa7',
      '#a1ff94',
      '#8dff7f',
      '#78ff67',
      '#5eff49',
      '#39ff14',
      '#30de10',
      '#28be0c',
      '#1f9e08'
    ],
    blushBomb: [
      '#f3d6da',
      '#f0ccd1',
      '#ecc1c8',
      '#e9b7bf',
      '#e5adb6',
      '#e1a3ad',
      '#dd99a4',
      '#c0848e',
      '#a47079',
      '#885d64'
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
    slate: [
      '#d1ecf7',
      '#c5e7f5',
      '#b9e2f3',
      '#adddf1',
      '#a0d8ef',
      '#94d3ed',
      '#87ceeb',
      '#75b3cc',
      '#6398ae',
      '#6398ae'
    ],
    dynamite: [
      '#ffbbae',
      '#ffa999',
      '#ff6f5b',
      '#ff6f5b',
      '#ff6f5b',
      '#ff5844',
      '#ff3c29',
      '#de3322',
      '#be2a1c',
      '#9e2115'
    ],
    wisteria: [
      '#e9d9f2',
      '#e4cfee',
      '#dfc6eb',
      '#d9bce7',
      '#d4b3e3',
      '#cea9e0',
      '#c9a0dc',
      '#ae8bbf',
      '#9576a3',
      '#7c6188'
    ]
  }
};
