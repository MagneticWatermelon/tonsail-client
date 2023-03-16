import { client } from '@/lib/apiClient';
import { useLogin } from '@/providers/AuthProvider';
import { useTitleActions } from '@/stores/AppTitleStore';
import { Paper, createStyles, TextInput, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PasswordStrength } from '../components/PasswordInputWithStrength';

const useStyles = createStyles((theme) => ({
  registerRoot: {
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

export function RegisterPage() {
  const { classes } = useStyles();
  const login = useLogin();
  const { setTitle } = useTitleActions();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    setTitle('Register');
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Name can not be empty'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 8 ? null : 'Password must have at least 8 characters')
    }
  });

  async function handleSubmit(data: { name: string; email: string; password: string }) {
    await client.post('register', {
      body: new URLSearchParams({
        name: data.name,
        email: data.email,
        password: data.password
      })
    });

    login.mutate(
      { email: data.email, password: data.password },
      { onSuccess: () => navigate(from, { replace: true }) }
    );
  }

  return (
    <div className={classes.registerRoot}>
      <div className={classes.wrapper}>
        <Paper className={classes.paper} radius={0} p={30}>
          <div className={classes.form}>
            <Title order={2} className={classes.title} align="center" mt="md" mb="xl">
              Get started
            </Title>

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                label="Name"
                placeholder="Graham Bell"
                size="md"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Email address"
                placeholder="hello@email.com"
                mt="md"
                size="md"
                {...form.getInputProps('email')}
              />
              <PasswordStrength form={form.getInputProps('password')} />
              <Button fullWidth mt="xl" size="md" radius="sm" type="submit">
                Sign Up
              </Button>
            </form>
          </div>
        </Paper>
      </div>
    </div>
  );
}
