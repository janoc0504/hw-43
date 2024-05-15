
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    return todos;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = action.payload.map(todo => ({
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                }));
            })
    },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodosStatus = (state) => state.todos.status;

export default todosSlice.reducer;