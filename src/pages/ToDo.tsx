import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTodoContext } from "../context/TodoContext";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Todo.scss";

const Todo = () => {
  const [text, setText] = useState("");
  const { addTask } = useTodoContext();
  const { isLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleAdd = () => {
    if (text.trim() !== "") {
      addTask(text);
      setText("");
    }
  };

  return (
    <div className="todo-container">
      <h2>New Task</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your task"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default Todo;
