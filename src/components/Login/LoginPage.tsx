import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Credentials, useLogin } from '../../lib/auth';
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
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

export function LoginPage() {
  const { classes } = useStyles();
  const auth = useAuth();
  const login = useLogin();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 8 ? null : 'Password must have at least 8 characters')
    }
  });

  function handleSubmit(data: { email: string; password: string }) {
    // login.mutate(data);
    // navigate(from, { replace: true });
    auth.signin({ email: data.email, password: data.password }, () => {
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

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                label="Email address"
                placeholder="hello@gmail.com"
                size="md"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                size="md"
                {...form.getInputProps('password')}
              />
              <Button fullWidth mt="xl" size="md" radius="sm" type="submit">
                Sign In
              </Button>
            </form>

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
