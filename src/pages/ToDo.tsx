import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Todo.scss";

const Todo = () => {
  const [text, setText] = useState("");
  const { addTask } = useTodoContext();
  const { user } = useLoginContext();
  const { tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const userTasks = tasks.filter((task) => task.userId === user?.id);

  const handleAdd = () => {
    if (!user) {
      alert("You have to be logged in in order to be able to add a task");
      return;
    }
    addTask(text, user.id);
    setText("");
  };

  console.log("Logged user:", user);
  console.log("All tasks:", tasks);
  return (
    <div className="todo-container">
      <h2>New Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your task"
        />
        <button type="submit" disabled={text.trim() === ""}>
          Add Task
        </button>
        <hr />
        <div className="home-container">
          <ul>
            {userTasks.map((task) => (
              <li key={task.id}>
                {editId !== task.id && (
                  <>
                    {
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(task.id)}
                      />
                    }
                  </>
                )}

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
                {editId !== task.id && (
                  <>
                    {
                      <button
                        onClick={() => {
                          setEditId(task.id);
                          setEditText(task.text);
                        }}
                      >
                        Edit
                      </button>
                    }
                  </>
                )}
                {editId === task.id && (
                  <>
                    {
                      <button
                        onClick={() => {
                          setEditId(null);
                        }}
                      >
                        Cancel
                      </button>
                    }
                  </>
                )}

                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Todo;
