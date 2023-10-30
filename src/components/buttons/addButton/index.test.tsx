import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddButton from './index';
import { RootState } from '../../../redux/store/store';

const mockStore = configureStore([]);

describe('AddButton component', () => {
  let store: any;

  beforeEach(() => {
    const initialState: RootState = {
      datastore: [],
      selectedTodo: {
        searchCompletedTodo: '',
        todoToComplete: [],
        todoToUndoComplete: [],
      }
    };
    store = mockStore(initialState);
  });

  test('renders AddButton component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddButton todoTitle="Test Todo" />
      </Provider>
    );

    const addButton = getByText('Add');
    expect(addButton).toBeInTheDocument();
  });

  test('dispatches addTodo action when button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddButton todoTitle="Test Todo" />
      </Provider>
    );

    const addButton = getByText('Add');
    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'Todos/addTodo',
        payload: {
          userId: 1,
          id: 1,
          title: 'Test Todo',
          completed: false,
        },
      },
    ]);
  });
});

