import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SignInPage from '../components/logincomp/MainPage.js';

const mock = new MockAdapter(axios);

describe('Auth Component', () => {
  it('logs in successfully with valid credentials', async () => {
    // Mock API response
    mock.onPost('http://localhost:8080/api/login').reply(200, {
      username: 'testuser',
    });

    render(<SignInPage />);

    // Fill in login form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Login'));

    // Wait for message to appear
    await waitFor(() => {
      expect(screen.getByText('Welcome, testuser')).toBeInTheDocument();
    });
  });

  it('shows an error message for invalid credentials', async () => {
    // Mock API error response
    mock.onPost('http://localhost:8080/api/login').reply(401);

    render(<SignInPage />);

    // Fill in login form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Login'));

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText('Login failed. Please check your credentials.')
      ).toBeInTheDocument();
    });
  });
});

