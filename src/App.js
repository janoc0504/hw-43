
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, fetchTodos, selectTodos, selectTodosStatus } from './store/slices/TodoSlice';
import './App.css';

function App() {
    const todos = useSelector(selectTodos);
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
            dispatch(addTodo({ title: todoText, completed: false })); // Corrected payload structure
            todoInput.value = '';
        }
    };

    const handleToggleTodo = (todo) => { // Changed parameter to todo object
        dispatch(toggleTodo(todo));
    };

    const handleDeleteTodo = (todo) => { // Changed parameter to todo object
        dispatch(deleteTodo(todo));
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
                {todos.map((todo, index) => (
                    <div key={index} className="todo-item-container">
                        <div
                            className={todo && todo.completed ? "todo-item completed" : "todo-item"}
                            onClick={() => handleToggleTodo(todo)} // Pass todo object instead of index
                        >
                            {todo ? todo.title : 'Loading...'} {/* Corrected property name */}
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteTodo(todo)}> {/* Pass todo object */}
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
