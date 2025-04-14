//import { render, screen, fireEvent } from '@testing-library/react';
//import RegistrationPage from '../components/registcomp/RegistForm'; // Update with actual path
//import axios from 'axios';
//
//// Mock axios post request
//jest.mock('axios');
//
//describe("RegistrationPage Component", () => {
//  it("renders RegistrationPage correctly", () => {
//    render(<RegistrationPage onFlip={jest.fn()} />);
//
//    // Check if "Registration" header is visible
//    const headerElement = screen.getByText(/Registration/i);
//    expect(headerElement).toBeTruthy(); // Just checking the element is truthy (i.e., it exists)
//  });
//
//  it("displays password strength feedback correctly", async () => {
//    render(<RegistrationPage onFlip={jest.fn()} />);
//
//    // Check for password strength feedback text
//    const passwordInput = screen.getByPlaceholderText(/Password/i);
//    fireEvent.change(passwordInput, { target: { value: 'testPassword123' } });
//
//    // You should adjust the expected feedback and strength based on your logic for password strength
//    const strengthText = await screen.findByText(/Strength:/i);
//    expect(strengthText).toBeTruthy(); // Just checking the element is truthy (i.e., it exists)
//  });
//
//  it("shows error message on failed registration", async () => {
//    // Simulate a failed registration by mocking axios post to reject
//    axios.post.mockRejectedValueOnce(new Error('Registration failed'));
//
//    render(<RegistrationPage onFlip={jest.fn()} />);
//
//    const form = screen.getByRole('form');
//    fireEvent.submit(form);
//
//    // Check if error message is shown
//    const errorMessage = await screen.findByText(/Registration failed/);
//    expect(errorMessage).toBeTruthy(); // Just checking the element is truthy (i.e., it exists)
//  });
//});
//
