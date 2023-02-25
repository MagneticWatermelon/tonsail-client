import { useLogout, useUser } from '@/providers/AuthProvider';
import { Menu, Group, ActionIcon } from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconDotsVertical
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout();

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
          <Menu.Item
            onClick={() => {
              navigate(`/account/${user.data?.id}`);
            }}
            icon={<IconSettings size={14} stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={() => {
              logout.mutate({});
            }}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
