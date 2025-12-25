// Home.tsx
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";
import "../styles/Home.scss";
import "../styles/ToDo.scss";
import { useLoginContext } from "../context/LoginContext";
import EditTaskForm from "../components/EditTaskForm";
import { ListRoot, ListItem } from "@chakra-ui/react";

const Home = () => {
  const { tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const [editId, setEditId] = useState<string | null>(null);

  const { isLoggedIn, user } = useLoginContext();

  if (!isLoggedIn || !user) return null;
  console.log(ListRoot, ListItem);

  return (
    <>
      {isLoggedIn && user && <h2>Welcome {user.name}</h2>}{" "}
      {isLoggedIn && (
        <div className="home-container">
          <h2>Your Tasks</h2>

          <ListRoot style={{ paddingLeft: "1rem", listStyleType: "disc" }}>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                {editId === task.id ? (
                  <EditTaskForm
                    taskId={task.id}
                    initialText={task.text}
                    onSave={(id: string, newText: string) => {
                      editTask(id, newText);
                      setEditId(null);
                    }}
                    onCancel={() => setEditId(null)}
                  />
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task.id)}
                    />
                    <span
                      onClick={() => toggleDone(task.id)}
                      className={task.done ? "done" : ""}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => {
                        setEditId(task.id);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </>
                )}
              </ListItem>
            ))}
          </ListRoot>
        </div>
      )}
    </>
  );
};

export default Home;
