import React from 'react';
import { render, screen } from '@testing-library/react';
import ListBar from './index';
import TextBoxButtons from "../buttons/textBoxButtons";
import { Provider } from "react-redux";
import { RootState } from "../../redux/store/store";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

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

test('renders ListBar component', () => {
  const {container} =  render(
    <Provider store={store}>
      <ListBar />
    </Provider>
  );

  // Ensure TextBoxButtons component is rendered
  const completeButton = screen.getByText('COMPLETE');
  const undoButton = screen.getByText('UNDO');

  expect(completeButton).toBeInTheDocument();
  expect(undoButton).toBeInTheDocument();
});
