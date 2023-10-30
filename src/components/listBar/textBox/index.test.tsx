import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TextBox from './index';
import { RootState } from '../../../redux/store/store';

const mockStore = configureStore([]);

describe('TextBox component', () => {
  let store: any;

  beforeEach(() => {
    const initialState: RootState = {
      datastore: [
        { id: 1, userId: 1, title: 'Todo 1', completed: false },
        { id: 2, userId: 2, title: 'Todo 2', completed: false },
      ],
      selectedTodo: {
        searchCompletedTodo: '',
        todoToComplete: [],
        todoToUndoComplete: [],
      },
    };
    store = mockStore(initialState);
  });

  test('renders TextBox component', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <TextBox isCompleted={false} />
      </Provider>
    )

    screen.debug()

    const checkbox1 = getByLabelText('Todo 1');
    const checkbox2 = getByLabelText('Todo 2');

    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
  });

  test('handles toggle todo correctly', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <TextBox isCompleted={false} />
      </Provider>
    );

    const checkbox1 = getByLabelText('Todo 1') as HTMLInputElement;
    const checkbox2 = getByLabelText('Todo 2') as HTMLInputElement;

    // Check if checkboxes are initially unchecked
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);

    // Simulate clicking checkboxes
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
  });
});
