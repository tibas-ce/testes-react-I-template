import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import userEvent from "@testing-library/user-event";

describe("Testes do TodoList", () => {
  test("1.1 - Deve renderizar com o título", () => {
    render(<TodoList />);
    const title = screen.getByText("Todo List");
    expect(title).toBeInTheDocument();
  });

  test("1.2 - O input deve iniciar vazio", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    expect(input).toHaveValue("");
  });

  test("2.1 - Deve atualizar o valor do input ao digitar", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    await user.type(input, "Estudar");
    expect(input).toHaveValue("Estudar");
  });

  test("2.2 - Deve renderizar uma nova tarefa ao digitar no input e pressionar enter", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    await user.type(input, "Estudar{enter}");
    const todoItem = screen.getByText(/estudar/i);

    expect(todoItem).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("3 - Deve alterar status da tarefa quando botão de alterar for clicado", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    await user.type(input, "Séries{enter}");
    const todoItem = screen.getByText(/séries/i);
    expect(todoItem).toBeInTheDocument();
    expect(input).toHaveValue("");

    const toggleButton = screen.getByRole("button", { name: /toggle/i });
    await user.click(toggleButton);
    expect(todoItem).toHaveStyle("text-decoration: line-through");
    
    await user.click(toggleButton);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("Fixação - Deve deletar a tarefa quando botão de deletar for clicado", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    await user.type(input, "Séries{enter}");
    const todoItem = screen.getByText(/séries/i);
    expect(todoItem).toBeInTheDocument();
    expect(input).toHaveValue("");

    const toggleButton = screen.getByRole("button", { name: /delete/i });
    await user.click(toggleButton);
    expect(todoItem).not.toBeInTheDocument();
  });
});
