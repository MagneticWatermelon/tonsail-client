import { useOrganization } from '@/features/organization';
import { useCreateProject } from '@/features/project';
import { User, UserSection } from '@/features/user';
import {
  createStyles,
  Navbar,
  Text,
  Group,
  NavLink,
  Button,
  Kbd,
  Collapse,
  ActionIcon,
  Modal,
  Stack,
  TextInput,
  ScrollArea,
  MediaQuery,
  Burger,
  useMantineTheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { openSpotlight } from '@mantine/spotlight';
import {
  IconSearch,
  IconSettingsAutomation,
  IconSettings,
  IconTemplate,
  IconStack3,
  IconPlus,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`
    }
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '167px',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  }
}));

interface NavBarProps {
  user: User;
  hidden: boolean;
  handler: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

export function NavbarSearch({ user, hidden, handler }: NavBarProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const createProject = useCreateProject();
  const [projectsOpened, setProjectsOpened] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const organization = useOrganization(user.organizationId);
  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must not be empty' : null)
    }
  });

  async function handleCreateProject(data: { name: string }) {
    createProject.mutate(
      { name: data.name, organizationId: user.organizationId },
      {
        onSuccess: () => {
          setModalOpened(false);
          organization.refetch();
          showNotification({
            title: 'Success',
            message: `Project created`,
            autoClose: 5000,
            color: 'green',
            icon: <IconCheck />
          });
        },
        onError(error) {
          showNotification({
            title: 'Project creation failed',
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
    <Navbar hiddenBreakpoint="sm" hidden={hidden} width={{ sm: 200, lg: 200 }} p="md">
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={!hidden}
          onClick={() => handler.toggle()}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>
      <Navbar.Section className={classes.section}>
        <UserSection image="" name={user.name} email={user.email} />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>
          <NavLink
            className={classes.mainLink}
            component={Link}
            label="Organization"
            to={`organization/${user.organizationId}`}
            icon={<IconSettings size={18} stroke={1.5} />}
          />
          <Group noWrap spacing={0}>
            <NavLink
              label="Projects"
              className={classes.mainLink}
              component="div"
              onClick={() => setProjectsOpened((o: any) => !o)}
              icon={<IconStack3 size={18} stroke={1.5} />}
            />
            <ActionIcon mr="xs" onClick={() => setModalOpened(true)}>
              <IconPlus />
            </ActionIcon>
          </Group>
          <Collapse in={projectsOpened} pl="lg">
            <ScrollArea.Autosize maxHeight={250} offsetScrollbars scrollbarSize={6}>
              {organization.data?.projects?.map((p, idx) => {
                return (
                  <NavLink
                    key={idx}
                    className={classes.mainLink}
                    component={Link}
                    label={p.name}
                    to={`projects/${p.id}`}
                    icon={<IconTemplate size={18} stroke={1.5} />}
                  />
                );
              })}
            </ScrollArea.Autosize>
          </Collapse>
          <NavLink
            className={classes.mainLink}
            component={Link}
            label="Tests"
            to="tests/asdfsjhdhf/config"
            icon={<IconSettingsAutomation size={18} stroke={1.5} />}
          />
        </div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group ml="md" spacing="xs">
          <Button
            style={{ paddingLeft: 3, paddingRight: 3 }}
            color="dark"
            variant="subtle"
            leftIcon={<IconSearch size={12} stroke={1.5} />}
            onClick={() => openSpotlight()}>
            <Text size="sm" weight={500}>
              Spotlight
            </Text>
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Kbd>Ctrl</Kbd>
            <span style={{ margin: '0 5px' }}>+</span>
            <Kbd>K</Kbd>
          </div>
        </Group>
      </Navbar.Section>
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        title={
          <Text size="xl" weight={700}>
            New Project
          </Text>
        }
        centered>
        <form onSubmit={form.onSubmit((values) => handleCreateProject(values))}>
          <Stack>
            <TextInput
              {...form.getInputProps('name')}
              label={
                <Text size="md" weight={700}>
                  Project Name
                </Text>
              }
            />
            <Button
              type="submit"
              variant="outline"
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
              size="lg"
              disabled={!form.isDirty()}>
              Save
            </Button>
          </Stack>
        </form>
      </Modal>
    </Navbar>
  );
}
