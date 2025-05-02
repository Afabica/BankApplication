import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationPage from "../components/registcomp/RegistForm";
import axios from "axios";

jest.mock("axios");

describe("RegistrationPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders RegistrationPage correctly", () => {
    render(<RegistrationPage onFlip={jest.fn()} />);

    const headerElement = screen.getByText(/Registration/i);
    expect(headerElement).not.toBeNull(); // No jest-dom
  });

  it("displays password strength feedback correctly", async () => {
    render(<RegistrationPage onFlip={jest.fn()} />);

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "testPassword123" } });

    const strengthText = await screen.findByText(/Strength:/i);
    expect(strengthText).not.toBeNull();
  });

  it("shows error message on failed registration", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    // Suppress expected error logging in test output
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(<RegistrationPage onFlip={jest.fn()} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        /Registration failed. Please check the details and try again./i
      );
      expect(errorMessage).not.toBeNull();
    });

    // Restore original console behavior
    console.error.mockRestore();
  });
});

