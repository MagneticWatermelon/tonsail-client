import { createStyles, Flex, ScrollArea, Text } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { useStageActions, useStages } from '../../stores/StagesStore';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '260px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
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

export function StageDragDrop() {
  const { classes, cx } = useStyles();
  const stages = useStages();
  const { reorderStages } = useStageActions();

  const items = stages.map((item, index) => (
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
            <Text fz="sm" fw={500}>
              {`${item.userAmount} Users`}
            </Text>
            <Text fz="sm" fw={500}>
              {item.duration}
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
          reorderStages(source.index, destination?.index || 0)
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
