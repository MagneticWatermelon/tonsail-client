import {
  createStyles,
  Navbar,
  Code,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  NavLink,
  Button,
  Kbd
} from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import {
  IconSearch,
  IconPlus,
  IconHome2,
  IconSettingsAutomation,
  IconSettings
} from '@tabler/icons';
import { Link } from 'react-router-dom';
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
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
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
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none'
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5
  },

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  }
}));

const links = [
  { icon: IconHome2, label: 'Projects', to: 'projects/' },
  { icon: IconSettingsAutomation, label: 'Tests', to: 'tests/asdfsjhdhf/config' },
  { icon: IconSettings, label: 'Settings', to: 'settings/' }
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' }
];

export function NavbarSearch() {
  const { classes } = useStyles();

  const mainLinks = links.map((link, idx) => (
    <NavLink
      key={idx}
      className={classes.mainLink}
      component={Link}
      label={link.label}
      to={link.to}
      icon={<link.icon size={18} stroke={1.5} />}
    />
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span> {collection.label}
    </a>
  ));

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={false}
      width={{ sm: 200, lg: 200 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.section}>
        <UserSection image="" name="Oguzhan Ipek" email="fgtyhtyh@hotmail.com" />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
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
