import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import TodoItem from ".";

const todo = {
  id: Math.random(),
  text: "Go to the gym",
};

describe("<TodoItem />", () => {
  test("should render correctly", () => {
    const handleDeleteTodo = jest.fn();
    render(<TodoItem {...todo} handleDeleteTodo={handleDeleteTodo} />);

    const todoItem = screen.getByRole("listitem");
    const deleteButton = screen.getByRole("button", { name: "delete" });

    expect(todoItem).toHaveTextContent("Go to the gym");
    expect(deleteButton).toBeInTheDocument();
  });

  test("should call the handleDeleteTodo when the delete button is clicked", async () => {
    user.setup();
    const handleDeleteTodo = jest.fn();
    render(<TodoItem {...todo} handleDeleteTodo={handleDeleteTodo} />);

    const deleteButton = screen.getByRole("button", { name: "delete" });

    await user.click(deleteButton);
    expect(handleDeleteTodo).toHaveBeenCalled();
    /* expect(handleDeleteTodo).toHaveBeenCalledWith(todo.id); */
  });
});
