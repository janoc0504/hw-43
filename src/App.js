import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addNewTodo,
    toggleNewTodo,
    deleteNewTodo,
    toggleServerTodo,
    deleteServerTodo,
    fetchTodos,
    selectServerTodos,
    selectNewTodos,
    selectTodosStatus
} from './store/slices/TodoSlice';
import './App.css';

function App() {
    const serverTodos = useSelector(selectServerTodos);
    const newTodos = useSelector(selectNewTodos);
    const status = useSelector(selectTodosStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const todoInput = event.target.elements.todoInput;
        const todoText = todoInput.value.trim();
        if (todoText) {
            dispatch(addNewTodo({ title: todoText, completed: false }));
            todoInput.value = '';
        }
    };

    const handleToggleServerTodo = (todo) => {
        dispatch(toggleServerTodo(todo));
    };

    const handleDeleteServerTodo = (todo) => {
        dispatch(deleteServerTodo(todo));
    };

    const handleToggleNewTodo = (todo) => {
        dispatch(toggleNewTodo(todo));
    };

    const handleDeleteNewTodo = (todo) => {
        dispatch(deleteNewTodo(todo));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: Unable to load todos</div>;
    }

    return (
        <div className="App">
            <div className="todo-list">
                <h2>Server Todos</h2>
                {serverTodos.map((todo) => (
                    <div key={todo.id} className="todo-item-container">
                        <div
                            className={todo.completed ? "todo-item completed" : "todo-item"}
                            onClick={() => handleToggleServerTodo(todo)}
                        >
                            {todo.title}
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteServerTodo(todo)}>
                            Delete Todo
                        </button>
                    </div>
                ))}
            </div>
            <div className="todo-list">
                <h2>New Todos</h2>
                {newTodos.map((todo) => (
                    <div key={todo.id} className="todo-item-container">
                        <div
                            className={todo.completed ? "todo-item completed" : "todo-item"}
                            onClick={() => handleToggleNewTodo(todo)}
                        >
                            {todo.title}
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteNewTodo(todo)}>
                            Delete Todo
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="todoInput" placeholder="Enter todo" />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

export default App;
