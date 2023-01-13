import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../util/AuthProvider';

const useStyles = createStyles((theme) => ({
  loginRoot: {
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)'
  },
  wrapper: {
    height: '100%',
    width: '50%'
  },

  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 450,
    paddingBottom: 120,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%'
    }
  },

  paper: {
    height: 'inherit',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export function LoginPage() {
  const { classes } = useStyles();
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  function handleSubmit(event: any) {
    event.preventDefault();

    // let formData = new FormData(event.currentTarget);
    // let username = formData.get('username') as string;
    auth.signin('fgtyhtyh', () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className={classes.loginRoot}>
      <div className={classes.wrapper}>
        <Paper className={classes.paper} radius={0} p={30}>
          <div className={classes.form}>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back to Mantine!
            </Title>

            <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" radius="sm" onClick={handleSubmit}>
              Sign In
            </Button>

            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
                Register
              </Anchor>
            </Text>
          </div>
        </Paper>
      </div>
    </div>
  );
}
