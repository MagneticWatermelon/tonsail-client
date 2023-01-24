import { createStyles, Navbar, Text, Group, NavLink, Button, Kbd } from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import { IconSearch, IconHome2, IconSettingsAutomation, IconSettings } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../util/AuthProvider';
import { UserSection } from '../User/UserButton';

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
    width: '100%',
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
  opened: boolean;
}

export function NavbarSearch({ opened }: NavBarProps) {
  const { classes } = useStyles();
  const { user } = useAuth();

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 200 }}
      p="md"
      className={classes.navbar}
    >
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
          <NavLink
            className={classes.mainLink}
            component={Link}
            label="Projects"
            to="projects/"
            icon={<IconHome2 size={18} stroke={1.5} />}
          />
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
            onClick={() => openSpotlight()}
          >
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
    </Navbar>
  );
}
