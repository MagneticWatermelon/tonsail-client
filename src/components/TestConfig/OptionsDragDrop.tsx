import { createStyles, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { useRequestActions, useRequests } from '../../stores/RequestsStore';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '260px',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    paddingTop: `${theme.spacing.sm}px`,
    paddingBottom: `${theme.spacing.sm}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.xs, // to offset drag handle
    paddingRight: theme.spacing.lg, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingRight: theme.spacing.xs
  }
}));

function assignColor(method: string): string {
  switch (method) {
    case 'GET':
      return 'green';
    case 'POST':
      return 'orange';
    case 'PUT':
      return 'blue';
    case 'DELETE':
      return 'red';
    default:
      return 'grape.4';
  }
}

export function OptionsDnD() {
  const { classes, cx } = useStyles();
  const requests = useRequests();
  const { reorderRequests } = useRequestActions();

  const items = requests.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <Flex direction="column" style={{ minWidth: '0' }}>
            <Group noWrap spacing="xs">
              <Text c={assignColor(item.method)} fz="sm" fw="bold">
                {item.method}
              </Text>
              <Text
                display="block"
                style={{ whiteSpace: 'nowrap' }}
                color="dimmed"
                lineClamp={1}
                fz="xs"
                fw="bold"
              >
                {item.name}
              </Text>
            </Group>
            <Text
              display="block"
              style={{ whiteSpace: 'nowrap' }}
              color="dimmed"
              lineClamp={1}
              fz="xs"
              fw={400}
            >
              {item.url}
            </Text>
          </Flex>
        </div>
      )}
    </Draggable>
  ));

  return (
    <ScrollArea.Autosize
      maxHeight="calc(100vh - var(--mantine-header-height, 0px) - 114px)"
      style={{ flexGrow: 1 }}
      scrollbarSize={8}
      scrollHideDelay={100}
    >
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          reorderRequests(source.index, destination?.index || 0)
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollArea.Autosize>
  );
}
