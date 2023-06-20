import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  test("deve renderizar com o título", () => {
    render(<Counter />);

    const title = screen.getByText("Counter");

    expect(title).toBeInTheDocument();
  });

  test("deve iniciar com o valor 0", () => {
    render(<Counter />);

    const value = screen.getByText("0");

    expect(value).toBeInTheDocument();
  });

  test("deve aumentar o valor do contador em 1 quando o botão de incremento for clicado", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const incrementButton = screen.getByText("+");

    await user.click(incrementButton);

    const value = screen.getByText("1");

    expect(value).toBeInTheDocument();
  });

  test("deve diminuir o valor do contador em 1 quando o botão de decremento for clicado", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const decrementButton = screen.getByText("-");

    await user.click(decrementButton);

    const value = screen.getByText("-1");

    expect(value).toBeInTheDocument();
  });
});
