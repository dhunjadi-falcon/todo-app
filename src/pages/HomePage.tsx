// Home.tsx
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";
import "../styles/Home.scss";
import "../styles/ToDo.scss";
import { useLoginContext } from "../context/LoginContext";

const Home = () => {
  const { tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { isLoggedIn } = useLoginContext();

  return (
    <>
      {" "}
      {isLoggedIn && (
        <div className="home-container">
          <h2>Your Tasks</h2>

          <ul>
            {tasks.map((task) => (
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
      )}
    </>
  );
};

export default Home;
