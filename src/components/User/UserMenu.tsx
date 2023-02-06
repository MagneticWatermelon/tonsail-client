import { Menu, Group, ActionIcon } from '@mantine/core';
import { IconLogout, IconSettings, IconSwitchHorizontal, IconDotsVertical } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../util/AuthProvider';

export function UserMenu() {
  const auth = useAuth();
  const navigate = useNavigate();

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
              navigate(`/account/${auth.user.id}`);
            }}
            icon={<IconSettings size={14} stroke={1.5} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={() => {
              auth.signout(() => navigate('/'));
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
