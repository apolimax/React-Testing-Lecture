import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import TodoList from ".";

describe("<TodoList />", () => {
  test("should render correctly", () => {
    render(<TodoList />);

    const headingElement = screen.getByRole("heading", { level: 1 });
    /* const inputElement = screen.getByRole("textbox", { name: "todo" }); */
    /* const inputElement = screen.getByPlaceholderText("type in your todo"); */
    const inputElement = screen.getByRole("textbox", { name: "todo" });
    const buttonElement = screen.getByRole("button", { name: "submit" });

    expect(headingElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  test("should enable the button once the input field has a value", async () => {
    user.setup();
    render(<TodoList />);

    const inputElement = screen.getByRole("textbox", { name: "todo" });
    const buttonElement = screen.getByRole("button", { name: "submit" });

    await user.type(inputElement, "walk the cat");

    expect(inputElement).toHaveValue("walk the cat");
    expect(buttonElement).toBeEnabled();
  });

  test("should clear the input value once the submit button is clicked", async () => {
    user.setup();
    render(<TodoList />);

    const inputElement = screen.getByRole("textbox", { name: "todo" });
    const buttonElement = screen.getByRole("button", { name: "submit" });

    await user.type(inputElement, "walk the cat");
    await user.click(buttonElement);

    expect(inputElement).toHaveValue("");
  });

  test("should list the todos submited", async () => {
    user.setup();
    render(<TodoList />);

    const inputElement = screen.getByRole("textbox", { name: "todo" });
    const buttonElement = screen.getByRole("button", { name: "submit" });

    await user.type(inputElement, "walk the cat");
    await user.click(buttonElement);

    await user.type(inputElement, "walk the dog");
    await user.click(buttonElement);

    const todo = screen.getAllByRole("listitem");

    expect(todo[0]).toHaveTextContent("walk the cat");
    expect(todo[1]).toHaveTextContent("walk the dog");
    expect(todo).toHaveLength(2);
  });

  test("should remove a todo when its delete button is clicked", async () => {
    user.setup();
    render(<TodoList />);

    const inputElement = screen.getByRole("textbox", { name: "todo" });
    const buttonElement = screen.getByRole("button", { name: "submit" });

    await user.type(inputElement, "walk the cat");
    await user.click(buttonElement);

    const todo = screen.getByRole("listitem");
    expect(todo).toHaveTextContent("walk the cat");

    const deleteButtonElement = screen.getByRole("button", { name: "delete" });
    await user.click(deleteButtonElement);

    expect(todo).not.toBeInTheDocument();
  });
});
