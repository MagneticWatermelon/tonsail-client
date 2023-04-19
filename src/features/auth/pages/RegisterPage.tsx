import { useRegister } from '@/providers/AuthProvider';
import { useTitleActions } from '@/stores/AppTitleStore';
import { createStyles, TextInput, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PasswordStrength } from '../components/PasswordInputWithStrength';

const useStyles = createStyles((theme) => ({
  registerRoot: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      theme.colorScheme == 'light'
        ? 'linear-gradient(0deg, rgb(203,212,225) 0%, rgb(248,250,252) 50%)'
        : 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(14,21,47,1) 75%, rgba(19,28,59,1) 100%)'
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

  button: {
    backgroundColor:
      theme.colorScheme == 'dark' ? theme.colors.spaceCadet[6] : theme.colors.nordicNoir[6],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.nordicNoir[5]
    }
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

export function RegisterPage() {
  const { classes } = useStyles();
  const register = useRegister();
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

  async function handleRegister(data: { name: string; email: string; password: string }) {
    register.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => navigate(from, { replace: true }),
        onError(error) {
          form.reset();
          showNotification({
            title: 'Register Failed',
            message: `${error}`,
            autoClose: 5000,
            color: 'red',
            icon: <IconX />
          });
        }
      }
    );
  }

  return (
    <div className={classes.registerRoot}>
      <div className={classes.form}>
        <Title order={2} className={classes.title} align="center" mt="md" mb="xl">
          Create your Tonsail account
        </Title>

        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
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
          <Button className={classes.button} fullWidth mt="xl" size="md" radius="sm" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
