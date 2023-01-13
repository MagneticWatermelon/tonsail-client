import { Menu, Group, ActionIcon } from '@mantine/core';
import { IconLogout, IconSettings, IconSwitchHorizontal, IconDotsVertical } from '@tabler/icons';
import { useAuth } from '../../util/AuthProvider';

export function UserMenu() {
  const { onLogout } = useAuth();

  return (
    <Group position="center">
      <Menu withArrow width={200} position="bottom" transition="pop">
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical size={16} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} onClick={onLogout} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
