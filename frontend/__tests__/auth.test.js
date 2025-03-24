import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignInPage from "../components/logincomp/MainPage";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extended-expect";

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
const mockRouter = useRouter;
describe("SignInPage Component", () => {
  beforeEach(() => {
    mockRouter.mockReturnValue({ push: jest.fn() }); // Mock router.push
  });
  afterEach(() => {
    mock.resetHandlers(); // Reset mock responses
  });
  it("renders the login form", () => {
    render(<SignInPage />);
    // Check if the form elements exist
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
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
        expect.objectContaining({ path: "/", httpOnly: true, secure: true }),
      );
      expect(mockRouter().push).toHaveBeenCalledWith("/dashboard");
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
