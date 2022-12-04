import { ActionIcon, Menu } from '@mantine/core';
import { IconCopy, IconDotsVertical, IconTrash } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { Scenario, useScenarioActions } from '../../stores/ScenariosStore';

type OptionsMenuProps = {
  scenario: Scenario;
};

export default function ScenarioDropdownMenu({ scenario }: OptionsMenuProps) {
  const { cloneScenario, deleteScenario } = useScenarioActions();

  return (
    <Menu shadow="md" width={200} withinPortal>
      <Menu.Target>
        <ActionIcon my={7} mr="xs" variant="subtle" color="gray" size={30}>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconCopy size={14} />}
          onClick={() => {
            let newId = nanoid(8);
            cloneScenario(scenario, newId);
          }}
        >
          Clone
        </Menu.Item>
        <Menu.Item
          icon={<IconTrash size={14} />}
          color="red"
          onClick={() => deleteScenario(scenario)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
