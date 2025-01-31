import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignInPage from "../components/logincomp/MainPage";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";

// Mock axios
const mock = new MockAdapter(axios);

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock nookies
jest.mock("nookies", () => ({
  setCookie: jest.fn(),
}));

// Mock jwtDecode
jest.mock("jwt-decode", () => jest.fn());

describe("SignInPage Component", () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush }); // Use mockPush directly
  });

  afterEach(() => {
    mock.resetHandlers(); // Reset mock responses after each test
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  it("renders the login form", () => {
    render(<SignInPage />);

    // Check if form elements exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("logs in successfully and redirects to dashboard", async () => {
    // Mock a successful login response
    mock.onPost("http://localhost:8080/api/login").reply(200, {
      token: "fake.jwt.token",
    });

    // Mock decoded JWT with expiration
    jwtDecode.mockReturnValue({ exp: Date.now() / 1000 + 3600 });

    render(<SignInPage />);

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for authentication actions
    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith(
        null,
        "jwt",
        "fake.jwt.token",
        expect.objectContaining({ path: "/" }) // Less strict check
      );

      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows an error message for failed login", async () => {
    // Mock a failed login response
    mock.onPost("http://localhost:8080/api/login").reply(401);

    render(<SignInPage />);

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(
        screen.getByText(/login failed/i)
      ).toBeInTheDocument();
    });
  });
});

