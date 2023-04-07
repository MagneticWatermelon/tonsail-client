import React from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Title,
  Loader
} from '@mantine/core';
import { NavbarSearch } from './Navbar';
import { useTitle } from '../../stores/AppTitleStore';
import { useUser } from '../../providers/AuthProvider';
import { useDisclosure } from '@mantine/hooks';

type ShellProps = {
  children: React.ReactNode;
};

export default function ApplicationShell({ children }: ShellProps) {
  const theme = useMantineTheme();
  const title = useTitle();
  const user = useUser();
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, handlers] = useDisclosure();

  if (user.isLoading) {
    return <Loader />;
  }

  if (!user.data) {
    return <div>Erorororor</div>;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.spaceCadet[9] : theme.colors.gray[0]
        }
      }}
      layout="alt"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSearch user={user.data} hidden={!opened} handler={handlers} />}
      header={
        <Header
          style={{
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.spaceCadet[9] : theme.colors.gray[0]
          }}
          height={{ base: 50 }}
          p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => handlers.toggle()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Title order={4} weight={700}>
              {title}
            </Title>
            <ActionIcon
              variant="outline"
              color={theme.colorScheme === 'dark' ? 'limeZest' : 'blue.8'}
              onClick={() => toggleColorScheme()}
              size={30}
              style={{ marginLeft: 'auto' }}>
              {theme.colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
            </ActionIcon>
          </div>
        </Header>
      }>
      {children}
    </AppShell>
  );
}
