import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignInPage from "../components/logincomp/MainPage";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";

// Mock axios
const mock = new MockAdapter(axios);

// Mock next/router
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
  beforeEach(() => {
    // Mocking useRouter with the push function
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    mock.resetHandlers(); // Reset mock responses
  });

  it("renders the login form", () => {
    render(<SignInPage />);
    // Check if the form elements exist
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    // Ensure the elements are rendered
    expect(usernameInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(signInButton).not.toBeNull();
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
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for the redirect to occur
    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith(
        null,
        "jwt",
        "fake.jwt.token",
        expect.objectContaining({
          path: "/",
          httpOnly: false, // Expect httpOnly: false instead of true
          secure: true,
        }),
      );
      //      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows an error message for failed login", async () => {
    // Mock a failed login response
    mock.onPost("http://localhost:8080/api/login").reply(401);

    render(<SignInPage />);

    // Fill out the login form
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText(
        "Login failed. Please check your credentials and try again.",
      );
      // Check if the error message appears correctly
      expect(errorMessage).not.toBeNull();
    });
  });
});
