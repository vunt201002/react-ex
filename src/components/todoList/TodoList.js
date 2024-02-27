import React, { useEffect, useState } from 'react';
import Todo from "../todo/Todo.js";
import TodoForm from "../todoForm/TodoForm.js";
import { baseUrl } from "../api/apiUrl.js";
import useFetchApi from "../../hooks/useFetchApi.js";
import { Card, Page, ResourceList } from '@shopify/polaris';
import TodoContext from '../../context/TodoContext.js';

const TodoList = ({ isShowModal, setIsShowModal, refButton }) => {
  const { data } = useFetchApi(`${baseUrl}/products`);
  const [todos, setTodos] = useState(data.data || []);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setTodos(prev => data.data || []);
  }, [data]);

  const addTodo = async text => {
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
      let updatedTodos = todos.filter(todo => selectedItems.includes(todo.id));

      updatedTodos = updatedTodos.map(e => ({
        ...e,
        isCompleted: true
      }));

      const response = await fetch(`${baseUrl}/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodos),
      });
      const res = await response.json();
      setSelectedItems([]);
      console.log(res);
    } catch (err) {
      console.log("Error when update todoes");
    }
  };

  const removeTodo = async id => {
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
      setSelectedItems([]);
      console.log(res);
    } catch (err) {
      console.log("Error when delete todoes");
    }
  };
  
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
    <TodoContext.Provider value={{ removeTodo, completeTodo }}>
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
        <TodoForm refButton={refButton} addTodo={addTodo} isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      </Page>
    </TodoContext.Provider>
  );
};

export default TodoList;
