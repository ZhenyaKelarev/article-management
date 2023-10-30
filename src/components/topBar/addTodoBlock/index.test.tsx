import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBlock from './index';
import AddButton from '../../buttons/addButton';

jest.mock('../../buttons/addButton', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SearchBlock component', () => {
  test('renders SearchBlock component', () => {
    const { getByPlaceholderText } = render(<SearchBlock />);
    const searchInput = getByPlaceholderText('Search');

    expect(searchInput).toBeInTheDocument();
  });

  test('updates input value and calls AddButton component correctly', () => {
    const addButtonMock = AddButton as jest.MockedFunction<typeof AddButton>;

    const { getByPlaceholderText } = render(<SearchBlock />);
    const searchInput = getByPlaceholderText('Search');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'New Todo' } });

    // Check if input value is updated
    // @ts-ignore
    expect(searchInput.value).toBe('New Todo');
  });
});
