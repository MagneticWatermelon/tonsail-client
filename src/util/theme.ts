import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

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
};
