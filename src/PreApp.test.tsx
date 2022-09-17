import React from 'react';
import { render, screen } from '@testing-library/react';
import PreApp from './PreApp';

test('renders learn react link', () => {
  render(<PreApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
