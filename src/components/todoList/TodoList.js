import React, { useEffect, useState } from 'react';

import Todo from "../todo/Todo.js";
import TodoForm from "../todoForm/TodoForm.js";
import "./todoList.css";

const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const baseUrl = "http://localhost:5000/api";

    const getData = async () => {
        try {
            const res = await fetch(`${baseUrl}/products`);
            const todoList = await res.json();
            setTodos(todoList.data);
            setIsLoading(false);
        } catch (err) {
            console.log("Error when get data");
        }
    }

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

    const completeTodo = async index => {
        // const newTodos = [...todos];
        // newTodos[index].isCompleted = true;
        // setTodos(newTodos);

        try {
            const response = await fetch(`${baseUrl}/product/${todos[index].id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: todos[index].id,
                    text: todos[index].text,
                    isCompleted: true
                }),
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log("Error when update todo");
        }
    };

    const removeTodo = async index => {
        // const newTodos = [...todos];
        // newTodos.splice(index, 1);
        // setTodos(newTodos);
        
        try {
            const response = await fetch(`${baseUrl}/product/${todos[index].id}`, {
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

    return (
        <div className="todo-list">
            {!isLoading && todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
                <TodoForm addTodo={addTodo} />
        </div>
    );
};

export default TodoList;