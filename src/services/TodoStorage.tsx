import { ListOfTodos } from "../types";

export const saveTodos = (todos: ListOfTodos): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodos = (): ListOfTodos => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
};