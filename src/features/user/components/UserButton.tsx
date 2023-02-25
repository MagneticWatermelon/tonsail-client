import { Group, Avatar, Text, createStyles } from '@mantine/core';
import Avvvatars from 'avvvatars-react';
import { UserMenu } from './UserMenu';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
  }
}));

interface UserSectionProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserSection({ image, name, email }: UserSectionProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.user}>
      <Group spacing="xs">
        <Avatar component={Avvvatars} value={name} radius="xl" />
        <div style={{ flex: 1 }}>
          <div style={{ width: 80 }}>
            <Text
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              size="xs"
              weight={500}
              lineClamp={1}
            >
              {name}
            </Text>
          </div>
          <div style={{ width: 80 }}>
            <Text sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} color="dimmed" size="xs">
              {email}
            </Text>
          </div>
        </div>
        <UserMenu />
      </Group>
    </div>
  );
}
