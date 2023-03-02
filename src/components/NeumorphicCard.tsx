import { CardProps, createStyles, Paper } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    background:
      theme.colorScheme === 'dark'
        ? 'linear-gradient(145deg, #121315, #151619)'
        : 'linear-gradient(145deg, #f2f2f2, #ffffff)',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '20px 0px 20px #080809,-20px 0px 20px #080809'
        : '20px 0px 20px #c2c2c2,-20px 0px 20px #c2c2c2'
  }
}));

export function NeumorphicCard({ children, ...props }: CardProps) {
  const { classes, theme } = useStyles();
  return (
    <Paper className={classes.card} {...props}>
      {children}
    </Paper>
  );
}
