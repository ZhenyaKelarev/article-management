import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TextBoxButtons from './index';
import { RootState } from '../../../redux/store/store';

const mockStore = configureStore([]);

describe('TextBoxButtons component', () => {
  let store: any;

  beforeEach(() => {
    const initialState: RootState = {
      datastore: [],
      selectedTodo: {
        searchCompletedTodo: '',
        todoToComplete: [1, 2],
        todoToUndoComplete: [3, 4],
      }
    };
    store = mockStore(initialState);
  });

  test('renders TextBoxButtons component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TextBoxButtons />
      </Provider>
    );

    const completeButton = getByText('COMPLETE');
    const undoButton = getByText('UNDO');
    expect(completeButton).toBeInTheDocument();
    expect(undoButton).toBeInTheDocument();
  });

  test('dispatches actions when buttons are clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TextBoxButtons />
      </Provider>
    );

    const completeButton = getByText('COMPLETE');
    const undoButton = getByText('UNDO');

    fireEvent.click(completeButton);
    fireEvent.click(undoButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'Todos/updateTodoStatus', payload: { id: 1, completed: true } },
      { type: 'SelectedTodoIds/removeSelectedToComplete', payload: 1 },
      { type: 'Todos/updateTodoStatus', payload: { id: 2, completed: true } },
      { type: 'SelectedTodoIds/removeSelectedToComplete', payload: 2 },
      { type: 'Todos/updateTodoStatus', payload: { id: 3, completed: false } },
      { type: 'SelectedTodoIds/removeSelectedToUndoComplete', payload: 3 },
      { type: 'Todos/updateTodoStatus', payload: { id: 4, completed: false } },
      { type: 'SelectedTodoIds/removeSelectedToUndoComplete', payload: 4 },
    ]);
  });
});
