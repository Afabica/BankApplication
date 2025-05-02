import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from '../components/registcomp/RegistForm';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe("RegistrationPage", () => {
  beforeEach(() => {
    // Reset mock before each test
    axios.post.mockReset();
  });

  it("shows error message on failed registration", async () => {
    // Force axios to reject the registration request
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    render(<RegistrationPage onFlip={jest.fn()} />);

    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Address/i), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByPlaceholderText(/Mobile Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Identification Details/i), { target: { value: "ID123" } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "TestPassword123" } });
    fireEvent.change(screen.getByPlaceholderText(/Employer Name/i), { target: { value: "Company Inc." } });
    fireEvent.change(screen.getByPlaceholderText(/Verification Code/i), { target: { value: "123456" } });

    // Set date of birth (using label or default query if no placeholder)
    const dobInput = screen.getByDisplayValue("");
    fireEvent.change(dobInput, { target: { value: "2000-01-01" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/Registration failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

