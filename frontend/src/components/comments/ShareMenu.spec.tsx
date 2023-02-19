import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareMenu } from './ShareMenu';

jest.mock('../../data/hooks/useSharingLink');

describe('ShareMenu', () => {
  it('renders the share form', () => {
    render(<ShareMenu show={true} />);
    expect(screen.getByText('Share Form')).toBeInTheDocument();
  });

  it('displays the link when "show link" button is clicked', async () => {
    render(<ShareMenu show={true} />);
    const emailInput = screen.getByPlaceholderText('vince@callpier.com');
    const datetimeInput = screen.getByPlaceholderText('Select Date and Time');
    const submitButton = screen.getByText('Create Share Link Access');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(datetimeInput, { target: { value: '2023-02-20T12:00' } });
    fireEvent.click(submitButton);
    const showLinkButton = screen.getByText('Create Share Link Access');
    fireEvent.click(showLinkButton);
    await waitFor(() => {
      expect(screen.getByText('test@example.com now has access until 20-02-2023 12-00')).toBeInTheDocument();
    });
  });
});
