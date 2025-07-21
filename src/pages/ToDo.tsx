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
  const { tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

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
      <hr />
      <div className="home-container">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              {editId === task.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      editTask(task.id, editText);
                      setEditId(null);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <span
                  onClick={() => toggleDone(task.id)}
                  className={task.done ? "done" : ""}
                >
                  {task.text}
                </span>
              )}
              <button
                onClick={() => {
                  setEditId(task.id);
                  setEditText(task.text);
                }}
              >
                ✏️
              </button>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
