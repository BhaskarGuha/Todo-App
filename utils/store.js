import { produce, current, original } from "immer";
import { nanoid } from "nanoid";
import { create } from "zustand";

// Use environment variable for API URL with localhost fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const todoStore = create((set) => ({
    todos: [
        // {
        //     catId: "2xdf45rc",
        //     todoId: "8irdf5tf",
        //     name: "My Task 1",
        //     description: "First Todo Description",
        // },
        // {
        //     catId: "45fcxdr5rc",
        //     todoId: "654xz34s",
        //     name: "My Task 2",
        //     description: "Second Todo Description",
        // },
        // {
        //     catId: "2xdf45rc",
        //     todoId: "gfh7bhbfh",
        //     name: "My Task 3",
        //     description: "Third Todo Description",
        // },
    ],
    categories: [
        // { catId: "2xdf45rc", name: "Todo App" },
        // { catId: "45fcxdr5rc", name: "AirBnb App" },
    ],
    addTodo: async (payload) => {
        // First add to local state for immediate UI update
        set(
            produce((state) => {
                state.todos.push({
                    catId: payload.catId,
                    todoId: nanoid(),
                    name: payload.name,
                    description: payload.description,
                });
                console.log(current(state.todos));
            })
        );

        // Then send to backend API to trigger email
        try {
            const token = localStorage.getItem('token'); // Get JWT token from auth
            const response = await fetch(`${API_BASE_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: payload.name,
                    description: payload.description,
                    categoryId: payload.catId
                })
            });

            if (response.ok) {
                console.log('Todo created and email sent successfully');
            } else {
                console.error('Failed to create todo on backend');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    },
    addCategory: (payload) =>
        set(
            produce((state) => {
                state.categories.push({ catId: nanoid(), name: payload.name });
            })
        ),

    removeTodo: (payload) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.todoId !== payload.todoId),
        })),

    removeAllTodoById: (payload) => set((state) => ({
        todos: state.todos.filter(todo => todo.catId !== payload.catId)
    })),

    removeCategory: (payload) =>
        set((state) => ({
            categories: state.categories.filter(
                (cat) => cat.catId !== payload.catId
            ),
        })),
}));

export const useTodosStore = todoStore;
