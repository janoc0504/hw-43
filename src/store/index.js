
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/TodoSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

export default store;