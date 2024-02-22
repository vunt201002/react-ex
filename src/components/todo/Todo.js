import React, { useEffect, useState } from 'react';

import { Avatar, Badge, Box, Checkbox, IndexFilters, IndexTable, InlineGrid, PageActions, ResourceItem, Text } from '@shopify/polaris';

const Todo = (item) => {
    const {id, text, isCompleted, completeTodo, removeTodo } = item;

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