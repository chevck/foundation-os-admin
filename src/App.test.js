import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard shell', () => {
  render(<App />);
  expect(screen.getByText(/foundation os/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /welcome, admin/i })).toBeInTheDocument();
});
