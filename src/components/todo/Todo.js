import React, { useContext } from 'react';

import { Badge, Box, InlineGrid, PageActions, ResourceItem, Text } from '@shopify/polaris';
import TodoContext from '../../context/TodoContext';

const Todo = (item) => {
  const { completeTodo, removeTodo } = useContext(TodoContext);
  
  const { id, text, isCompleted } = item;

  return (
    <ResourceItem
      id={id}
      isCompleted={isCompleted}
    >
      <InlineGrid columns={3} alignItems='center'>
        <Text variant="bodyMd" as="h3">
          {text}
        </Text>
        <Box>
          <Badge tone={isCompleted ? "success" : "attention"}>
            {isCompleted ? "Complete" : "Incomplete"}
          </Badge>
        </Box>
        <PageActions
          primaryAction={{
            content: 'Complete',
            onAction: () => completeTodo(id)
          }}
          secondaryActions={[
            {
              content: 'Delete',
              destructive: true,
              onAction: () => removeTodo(id)
            },
          ]}
        />
      </InlineGrid>
    </ResourceItem>
  );
};

export default Todo;