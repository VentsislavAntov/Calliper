import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))
  render(<App />);
  const linkElement = screen.getByText("Share");
  expect(linkElement).toBeInTheDocument();
});
