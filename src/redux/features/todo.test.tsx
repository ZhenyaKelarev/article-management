import React from 'react';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import todoSlice, {
  addToComplete,
  addToUndoComplete,
  resetComplete,
  resetUndoComplete,
  removeSelectedToComplete,
  removeSelectedToUndoComplete,
  setSearchCompletedTodo,
  clearSearchField,
} from './todoReducer'; // Replace with your actual file path

interface SetSearchCompletedTodoPayload {
  searchCompletedTodo: string;
}

interface TodoPayload {
  id: number;
}

describe('Todos Slice', () => {

  const initialState = {
    searchCompletedTodo: '',
    todoToComplete: [],
    todoToUndoComplete: [],
  };
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedTodo: createSlice({
          name: 'SelectedTodoIds',
          initialState: {
            searchCompletedTodo: '',
            todoToComplete: [],
            todoToUndoComplete: [],
          },
          reducers: {
            setSearchCompletedTodo: {
              reducer: (state, action: PayloadAction<SetSearchCompletedTodoPayload>) => {
                state.searchCompletedTodo = action.payload.searchCompletedTodo;
              },
              prepare: (searchCompletedTodo: string) => {
                return { payload: { searchCompletedTodo } };
              },
            },
            clearSearchField: (state) => {
              state.searchCompletedTodo = '';
            },
            addToComplete: (state, action: PayloadAction<TodoPayload>) => {
              // @ts-ignore
              state.todoToComplete.push(action.payload.id);
            },
            addToUndoComplete: (state, action: PayloadAction<TodoPayload>) => {
              // @ts-ignore
              state.todoToUndoComplete.push(action.payload.id);
            },
            resetComplete: (state) => {
              state.todoToComplete = [];
            },
            resetUndoComplete: (state) => {
              state.todoToUndoComplete = [];
            },
            removeSelectedToComplete: (state, action: PayloadAction<TodoPayload>) => {
              state.todoToComplete = state.todoToComplete.filter((id) => id !== action.payload.id);
            },
            removeSelectedToUndoComplete: (state, action: PayloadAction<TodoPayload>) => {
              state.todoToUndoComplete = state.todoToUndoComplete.filter((id) => id !== action.payload.id);
            },
          },
        }).reducer,
      },
    });
  });

  test('should set searchCompletedTodo correctly', () => {
    const searchText = 'Search Text';
    // @ts-ignore
    store.dispatch(setSearchCompletedTodo({ searchCompletedTodo: searchText }));

    const state = store.getState().selectedTodo;
    expect(state.searchCompletedTodo).toEqual(searchText);
  });

  it('should set the searchCompletedTodo value in the state', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [],
      todoToUndoComplete: [],
    };

    const newSearchText = 'New Search Text';
    const action = setSearchCompletedTodo(newSearchText);
    const nextState = todoSlice(initialState, action);

    expect(nextState.searchCompletedTodo).toEqual(newSearchText);
  });

  it('should clear the searchCompletedTodo field in the state', () => {
    const initialState = {
      searchCompletedTodo: 'Previous Search Text',
      todoToComplete: [1, 2, 3],
      todoToUndoComplete: [4, 5],
    };

    const action = clearSearchField();
    const nextState = todoSlice(initialState, action);

    expect(nextState.searchCompletedTodo).toEqual('');
  });

  it('should add a todo ID to the todoToComplete array in the state', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [1, 2, 3],
      todoToUndoComplete: [],
    };

    const todoIdToAdd = 4;
    const action = addToComplete(todoIdToAdd);
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToComplete).toContain(todoIdToAdd);
    expect(nextState.todoToComplete).toHaveLength(initialState.todoToComplete.length + 1);
  });

  it('should add a todo ID to the todoToUndoComplete array in the state', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [],
      todoToUndoComplete: [1, 2, 3],
    };

    const todoIdToAdd = 4;
    const action = addToUndoComplete(todoIdToAdd);
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToUndoComplete).toContain(todoIdToAdd);
    expect(nextState.todoToUndoComplete).toHaveLength(initialState.todoToUndoComplete.length + 1);
  });


  it('should reset the todoToComplete array to an empty array', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [1, 2, 3],
      todoToUndoComplete: [],
    };

    const action = resetComplete();
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToComplete).toEqual([]);
  });

  it('should reset the todoToUndoComplete array to an empty array', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [],
      todoToUndoComplete: [1, 2, 3],
    };

    const action = resetUndoComplete();
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToUndoComplete).toEqual([]);
  });

  it('should remove the specified item from todoToUndoComplete array', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [],
      todoToUndoComplete: [1, 2, 3],
    };

    const action = removeSelectedToUndoComplete(2);
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToUndoComplete).toEqual([1, 3]);
  });

  it('should remove the specified item from todoToComplete array', () => {
    const initialState = {
      searchCompletedTodo: '',
      todoToComplete: [1, 2, 3],
      todoToUndoComplete: [],
    };

    const action = removeSelectedToComplete(2);
    const nextState = todoSlice(initialState, action);

    expect(nextState.todoToComplete).toEqual([1, 3]);
  });
});
