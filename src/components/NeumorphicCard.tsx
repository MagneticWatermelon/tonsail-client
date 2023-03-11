import { CardProps, createStyles, Paper } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    background:
      theme.colorScheme === 'dark'
        ? 'linear-gradient(145deg, #121315, #151619)'
        : 'linear-gradient(145deg, #f2f2f2, #ffffff)',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '5px 0px 10px #080809,-5px 0px 10px #080809'
        : '5px 0px 10px #c2c2c2,-5px 0px 10px #c2c2c2'
  }
}));

export function NeumorphicCard({ children, className, ...props }: CardProps) {
  const { classes, cx } = useStyles();
  return (
    <Paper className={cx(classes.card, className)} {...props}>
      {children}
    </Paper>
  );
}
