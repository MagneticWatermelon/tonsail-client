import React, { useState } from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Title
} from '@mantine/core';
import { NavbarSearch } from './Navbar';
import { useTitle } from '../../stores/AppTitleStore';

type ShellProps = {
  children: React.ReactNode;
};

export default function ApplicationShell({ children }: ShellProps) {
  const theme = useMantineTheme();
  const title = useTitle();
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
      layout="alt"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSearch opened={opened} />}
      header={
        <Header height={{ base: 50 }} p="md">
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
            <Title order={4} weight={700}>{title}</Title>
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
