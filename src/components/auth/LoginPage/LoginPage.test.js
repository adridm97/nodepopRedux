import { fireEvent, render } from "@testing-library/react";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  test("snapshot", () => {
    const { container } = render(<LoginPage onLogin={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  test("should call onLogin", () => {
    const onLogin = jest.fn().mockResolvedValue();
    const username = "admin@admin.com";
    const password = "admin";

    const { getByLabelText, getByRole } = render(
      <LoginPage onLogin={onLogin} />
    );

    const usernameField = getByLabelText(/email/);
    const passwordField = getByLabelText(/password/);
    const submitButton = getByRole("button");

    expect(submitButton).toBeDisabled();
    fireEvent.change(usernameField, { target: { value: username } });
    fireEvent.change(passwordField, { target: { value: password } });

    fireEvent.click(submitButton);
  });
});
