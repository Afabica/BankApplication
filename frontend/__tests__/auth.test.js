// __tests__/auth.test.js
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignInPage from "../components/logincomp/MainPage";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import '@testing-library/jest-dom';

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

// Mock jwt-decode
jest.mock("jwt-decode", () => jest.fn());

const mockRouter = { push: jest.fn() };

describe("SignInPage Component", () => {
  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    mock.resetHandlers();
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("logs in successfully and redirects to dashboard", async () => {
    mock.onPost("https://localhost:8443/api/login").reply(200, {
      token: "fake.jwt.token",
      customer: { id: 1, name: "Maria" },
    });

    jwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "maria123" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "leopard1000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith(
        null,
        "jwt",
        "fake.jwt.token",
        expect.objectContaining({
          path: "/",
          httpOnly: false,
          secure: true,
          maxAge: 86400,
        })
      );

      expect(mockRouter.push).toHaveBeenCalledWith("/user/dashboard");
    });
  });

  it("shows an error message for failed login", async () => {
    mock.onPost("https://localhost:8443/api/login").reply(401, {
      message: "Invalid credentials",
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/login failed. please check your credentials/i)
      ).toBeInTheDocument();
    });
  });
});

