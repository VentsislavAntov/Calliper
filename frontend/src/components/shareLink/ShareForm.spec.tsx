import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ShareForm } from './ShareForm';
import { useSendShareLink } from '../../data/hooks/useSendShareLink';

describe('ShareForm', () => {
  it('renders the form fields', () => {
    render(<ShareForm setShowLink={() => {}} />);
    const emailInput = screen.getByPlaceholderText('vince@callpier.com');
    expect(emailInput).toBeInTheDocument();

    const datetimeInput = screen.getByPlaceholderText('Select Date and Time');
    expect(datetimeInput).toBeInTheDocument();

    const submitButton = screen.getByText('Create Share Link Access');
    expect(submitButton).toBeInTheDocument();
  });

  it('disables the submit button when fields are empty', () => {
    render(<ShareForm setShowLink={() => {}} />);
    const submitButton = screen.getByText('Create Share Link Access');

    expect(submitButton).toBeDisabled();
  });

  it('submits the form with valid data', async () => {
    render(<ShareForm setShowLink={() => {}} />);
    const emailInput = screen.getByPlaceholderText('vince@callpier.com');
    const datetimeInput = screen.getByPlaceholderText('Select Date and Time');
    const submitButton = screen.getByText('Create Share Link Access');

    await (async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(datetimeInput, { target: { value: '2023-02-20T12:00' } });
      fireEvent.click(submitButton);
      await waitFor(() => expect(useSendShareLink().publishLink).toHaveBeenCalled());
    });
  });

  it('shows error message when email format is incorrect', () => {
    render(<ShareForm setShowLink={() => {}} />);
    const emailInput = screen.getByPlaceholderText('vince@callpier.com');
    const datetimeInput = screen.getByPlaceholderText('Select Date and Time');
    const submitButton = screen.getByText('Create Share Link Access');

    fireEvent.change(emailInput, { target: { value: 'test@test' } });
    fireEvent.change(datetimeInput, { target: { value: '2023-02-20T12:00' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Email format is incorrect');
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error message when date is not between 2000 and 2100', () => {
    render(<ShareForm setShowLink={() => {}} />);
    const emailInput = screen.getByPlaceholderText('vince@callpier.com');
    const datetimeInput = screen.getByPlaceholderText('Select Date and Time');
    const submitButton = screen.getByText('Create Share Link Access');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(datetimeInput, { target: { value: '1999-02-20T12:00' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Date is not between 2000 and 2100');
    expect(errorMessage).toBeInTheDocument();
  });
});
