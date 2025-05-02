import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignInPage from "../components/logincomp/MainPage"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import "@testing-library/jest-dom";

// Mock axios
const mock = new MockAdapter(axios);

// Mock next/navigation (useRouter)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock nookies (setCookie)
jest.mock("nookies", () => ({
  setCookie: jest.fn(),
}));

// Mock jwtDecode
jest.mock("jwt-decode", () => jest.fn());

const mockRouter = { push: jest.fn() };

describe("SignInPage Component", () => {
  beforeEach(() => {
    // Reset the router mock before each test
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    mock.resetHandlers(); // Reset mock responses
    jest.clearAllMocks(); // Clear all mocks to ensure no residual mocks from previous tests
  });

  it("renders the login form", () => {
    render(<SignInPage />);

    // Check if the form elements exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("logs in successfully and redirects to dashboard", async () => {
    // Mock a successful login response with the correct URL
    mock.onPost("https://bankapplication.local/api/login").reply(200, {
      token: "fake.jwt.token",
    });

    // Mock decoded JWT with expiration
    jwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }); // Set expiration to 1 hour from now

    render(<SignInPage />);

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "maria123" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "leopard1000" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Log the request and response to ensure everything is correct
    await waitFor(() => {
      // Inspecting the request URL
      console.log("Checking request for login...");
      const request = mock.history.post[0]; // Get the first request in the history
      console.log(request); // Log the request to the console

      expect(request.url).toBe("https://bankapplication.local/api/login"); // Assert the correct URL
      expect(request.data).toContain("testuser"); // Check if data sent contains the username

      // Check if the JWT token was set as a cookie
      expect(setCookie).toHaveBeenCalledWith(
        null, // cookie name
        "jwt", // key
        "fake.jwt.token", // value
        expect.objectContaining({
          path: "/", // path
          httpOnly: true, // httpOnly flag
          secure: true, // secure flag
        }),
      );

      // Check if the user was redirected to the dashboard
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows an error message for failed login", async () => {
    // Mock a failed login response with the correct URL
    mock.onPost("https://bankapplication.local/api/login").reply(401, {
      message: "Invalid credentials",
    });

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

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(
          "Login failed. Please check your credentials and try again.",
        ),
      ).toBeInTheDocument();
    });
  });
});
