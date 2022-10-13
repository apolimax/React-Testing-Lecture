import { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: "",
    text: "",
  });

  const [isValid, setIsValid] = useState(false);

  function handleNewTodo(e) {
    setTodo({
      id: Math.random(),
      text: e.target.value,
    });

    if (e.target.value.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function submitNewTodo(e) {
    e.preventDefault();

    setTodos([...todos, todo]);
    setTodo({
      id: "",
      text: "",
    });
    setIsValid(false);
  }

  return (
    <div>
      <h1>todos</h1>
      <form onSubmit={submitNewTodo}>
        <label htmlFor="todo">todo</label>
        <input
          type="text"
          id="todo"
          autoFocus
          placeholder="type in your todo"
          autoComplete="off"
          value={todo.text}
          onChange={(e) => handleNewTodo(e)}
        />
        <button className="form_buttonSubmit" type="submit" disabled={!isValid}>
          submit
        </button>
      </form>
      <ul className="todos">
        {todos.map((todo, i) => (
          <TodoItem key={i} {...todo} handleDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
