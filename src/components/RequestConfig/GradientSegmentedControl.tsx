import { createStyles, MantineTheme, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  label: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
      }`,
    '&[data-active], &[data-active]:hover': {
      color: theme.white
    }
  },

  control: {
    border: '0 !important'
  }
}));

function pickGradient(method: string, theme: MantineTheme): string {
  switch (method) {
    case 'GET':
      return theme.fn.gradient({ from: 'blue', to: 'lime' });
    case 'POST':
      return theme.fn.gradient({ from: 'orange', to: 'yellow' });
    case 'PUT':
      return theme.fn.gradient({ from: 'indigo', to: 'teal' });
    case 'DELETE':
      return theme.fn.gradient({ from: 'red', to: 'orange' });
    default:
      return theme.fn.gradient({ from: 'violet', to: 'pink' });
  }
}

export function GradientSegmentedControl(props: SegmentedControlProps) {
  const { classes, theme } = useStyles();
  const [color, setColor] = useState<string>(theme.fn.gradient({ from: 'blue', to: 'lime' }));

  return (
    <SegmentedControl
      {...props}
      onChange={(v) => setColor(pickGradient(v, theme))}
      styles={() => ({
        indicator: {
          backgroundImage: color
        }
      })}
      classNames={classes}
    />
  );
}
