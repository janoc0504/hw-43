import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    return todos;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        serverTodos: [],
        newTodos: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addNewTodo: (state, action) => {
            state.newTodos.push({
                id: Date.now(), // Генерируем уникальный id для новых todo
                title: action.payload.title,
                completed: action.payload.completed,
            });
        },
        toggleNewTodo: (state, action) => {
            const todo = state.newTodos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteNewTodo: (state, action) => {
            state.newTodos = state.newTodos.filter(todo => todo.id !== action.payload.id);
        },
        toggleServerTodo: (state, action) => {
            const todo = state.serverTodos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteServerTodo: (state, action) => {
            state.serverTodos = state.serverTodos.filter(todo => todo.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle';
                state.serverTodos = action.payload.map(todo => ({
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                }));
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    addNewTodo,
    toggleNewTodo,
    deleteNewTodo,
    toggleServerTodo,
    deleteServerTodo
} = todosSlice.actions;

export const selectServerTodos = (state) => state.todos.serverTodos;
export const selectNewTodos = (state) => state.todos.newTodos;
export const selectTodosStatus = (state) => state.todos.status;

export default todosSlice.reducer;
