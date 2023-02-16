import { createStyles, Title, Text, Button, Group, Center } from '@mantine/core';
import { HTTPError } from 'ky';
import { Navigate, useNavigate, useRouteError } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    paddingTop: 80,
    paddingBottom: 80
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5
  }
}));

export function ErrorPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const error = useRouteError();

  if (error instanceof HTTPError) {
    if (error.response.status === 401) {
      return <Navigate to="/login" state={{ from: location }} />;
    } else {
      return (
        <Center className={classes.root}>
          <div className={classes.label}>{error.response.status}</div>
          <Title className={classes.title}>You have found a secret place.</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            {error.response.statusText}
          </Text>
          <Group position="center">
            <Button variant="subtle" size="md" onClick={() => navigate(-1)}>
              Take me back
            </Button>
          </Group>
        </Center>
      );
    }
  }

  return (
    <Center className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => navigate(-1)}>
          Take me back
        </Button>
      </Group>
    </Center>
  );
}
