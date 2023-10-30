import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { todosSlice, setTodos, updateTodoStatus, addTodo, deleteTodo } from './storeReducer';
import React from 'react';

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

describe('Todos Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todosSlice.reducer,
      },
    });
  });

  test('should set todos correctly', () => {
    const mockTodos: Todo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 2, title: 'Todo 2', completed: true },
    ];
    store.dispatch(setTodos(mockTodos));

    const state = store.getState().todos;
    expect(state).toEqual(mockTodos);
  });

  test('should update todo status correctly', () => {
    const initialState: Todo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 2, title: 'Todo 2', completed: false },
    ];
    store.dispatch(setTodos(initialState));

    const updatedTodo: Todo = { id: 1, userId: 1,  title: 'Todo 1', completed: true };
    store.dispatch(updateTodoStatus({ id: 1, completed: true }));

    const state = store.getState().todos;
    expect(state).toContainEqual(updatedTodo);
  });

  test('should add todo correctly', () => {
    const newTodo: Todo = { id: 1, userId: 1,  title: 'New Todo', completed: false };
    store.dispatch(addTodo(newTodo));

    const state = store.getState().todos;
    expect(state).toContainEqual(newTodo);
  });

  test('should delete todo correctly', () => {
    const initialState: Todo[] = [
      { id: 1, userId: 1,  title: 'Todo 1', completed: false },
      { id: 2, userId: 2,  title: 'Todo 2', completed: false },
    ];
    store.dispatch(setTodos(initialState));

    const todoIdToDelete = 1;
    store.dispatch(deleteTodo(todoIdToDelete));

    const state = store.getState().todos;
    expect(state).not.toContainEqual(expect.objectContaining({ id: todoIdToDelete }));
  });
});
