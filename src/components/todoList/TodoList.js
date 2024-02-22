import React, { useEffect, useState } from 'react';

import Todo from "../todo/Todo.js";
import TodoForm from "../todoForm/TodoForm.js";
import { baseUrl } from "../api/apiUrl.js";

import { BlockStack, Box, Card, Checkbox, InlineGrid, Page, ResourceList, Text } from '@shopify/polaris';

const TodoList = ({ isShowModal, setIsShowModal }) => {

    const [todos, setTodos] = React.useState([
        {
            text: "index",
            id: 16,
            isCompleted: false
        },
        {
            id: 9,
            text: "bypass",
            isCompleted: true
        },
        {
            id: 11,
            text: "calculate",
            isCompleted: true
        },
        {
            id: 6,
            text: "quantify",
            isCompleted: true
        }
    ]);

    useEffect(() => {
        getData();
    }, [todos]);

    const addTodo = async text => {
        // const newTodos = [...todos, { text }];
        // setTodos(newTodos);

        try {
            const response = await fetch(`${baseUrl}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when add todo");
        }
    };

    const completeTodo = async id => {
        // const newTodos = [...todos];
        // newTodos[index].isCompleted = true;
        // setTodos(newTodos);

        try {
            const todo = todos.find(t => t.id === id);
            
            if (todo) {
                todo.isCompleted = true;
            }

            const response = await fetch(`${baseUrl}/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when update todo");
        }
    };

    const completeTodos = async () => {
        try {
            const updatedTodos = todos.filter(todo => selectedItems.includes(todo.id));

            updatedTodos.forEach(e => {
                e.isCompleted = true;
            });

            console.log(updatedTodos);

            const response = await fetch(`${baseUrl}/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodos),
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when update todoes");
        }
    }

    const removeTodo = async id => {
        // const newTodos = [...todos];
        // newTodos.splice(index, 1);
        // setTodos(newTodos);
        
        try {
            const response = await fetch(`${baseUrl}/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when delete todo");
        }
    };

    const removeTodos = async () => {
        try {
            console.log(selectedItems);
            const response = await fetch(`${baseUrl}/products/d`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: selectedItems })
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when delete todoes");
        }
    };

    const getData = async () => {
        try {
            const res = await fetch(`${baseUrl}/products`);
            const todoList = await res.json();

            todoList.data.forEach(element => {
                element.removeTodo = removeTodo;
                element.completeTodo = completeTodo;
            });

            setTodos(todoList.data);
        } catch (err) {
            console.log("Error when get data");
        }
    };

    
    const [selectedItems, setSelectedItems] = useState([]);

    const resourceName = {
        singular: 'todo',
        plural: 'todoes',
    };

    const promotedBulkActions = [
        {
            content: 'Complete',
            onAction: completeTodos
        },
        {
            content: 'Delete',
            onAction: removeTodos
        },
    ];

    return (
        <>
            <Page fullWidth>
                <Card>
                    <ResourceList
                        resourceName={resourceName}
                        items={todos}
                        renderItem={Todo}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        promotedBulkActions={promotedBulkActions}
                        totalItemsCount={todos.length}
                    />
                </Card>
            </Page>
            <TodoForm addTodo={addTodo} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
        </>
    );
};

export default TodoList;