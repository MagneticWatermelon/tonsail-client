import React, { useState } from 'react';
import {
  IconSun,
  IconMoonStars,
  IconHome2,
  IconSettingsAutomation,
  IconSettings
} from '@tabler/icons';
import {
  AppShell,
  Navbar,
  Header,
  NavLink,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme
} from '@mantine/core';
import { Link } from 'react-router-dom';

type ShellProps = {
  children: React.ReactNode;
};

export default function ApplicationShell({ children }: ShellProps) {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 200 }}>
          <Navbar.Section>
            <NavLink
              styles={(theme) => ({
                root: {
                  ':hover': {
                    color: theme.colors.blue[6]
                  }
                }
              })}
              component={Link}
              label="Projects"
              to="projects/sdfkdskdf"
              icon={<IconHome2 size={18} stroke={1.5} />}
            />
          </Navbar.Section>
          <Navbar.Section>
            <NavLink
              styles={(theme) => ({
                root: {
                  ':hover': {
                    color: theme.colors.blue[6]
                  }
                }
              })}
              component={Link}
              label="Tests"
              to="tests/adfjsdf/config"
              icon={<IconSettingsAutomation size={18} stroke={1.5} />}
            />
          </Navbar.Section>
          <Navbar.Section>
            <NavLink
              styles={(theme) => ({
                root: {
                  ':hover': {
                    color: theme.colors.blue[6]
                  }
                }
              })}
              component={Link}
              label="Settings"
              to="settings/sdkfdjfnsd"
              icon={<IconSettings size={18} stroke={1.5} />}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>Application header</Text>
            <ActionIcon
              variant="outline"
              color={theme.colorScheme === 'dark' ? 'yellow' : 'blue.8'}
              onClick={() => toggleColorScheme()}
              size={30}
              style={{ marginLeft: 'auto' }}
            >
              {theme.colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
