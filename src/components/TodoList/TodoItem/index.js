function TodoItem({ handleDeleteTodo, ...todo }) {
  return (
    <li className="todo">
      <span>{todo.text}</span>
      <button
        className="todo_buttonDelete"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        delete
      </button>
    </li>
  );
}

export default TodoItem;
