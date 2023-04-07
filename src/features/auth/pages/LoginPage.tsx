import { createStyles, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '@/providers/AuthProvider';
import { useTitleActions } from '@/stores/AppTitleStore';
import { IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  loginRoot: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(14,21,47,1) 75%, rgba(19,28,59,1) 100%)'
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
    maxWidth: 450,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 120
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

export function LoginPage() {
  const { classes } = useStyles();
  const { setTitle } = useTitleActions();
  setTitle('Login');
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

  function handleLogin(data: { email: string; password: string }) {
    login.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => navigate(from, { replace: true }),
        onError() {
          form.reset();
          showNotification({
            title: 'Login Failed',
            message: `Wrong credentials`,
            autoClose: 5000,
            color: 'red',
            icon: <IconX />
          });
        }
      }
    );
  }

  return (
    <div className={classes.loginRoot}>
      <div className={classes.form}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Log in to Tonsail
        </Title>

        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput
            label="Email address"
            placeholder="hello@email.com"
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
          <Button color="spaceCadet.6" fullWidth mt="xl" size="md" radius="sm" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
