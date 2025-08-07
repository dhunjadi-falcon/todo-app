import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Todo.scss";
import UserTasks from "../components/UsersTask";
import { useNavigate } from "react-router";

const Todo = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  const { addTask, tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const { user } = useLoginContext();

  const handleAdd = () => {
    if (!user) {
      alert("You have to be logged in in order to be able to add a task");
      return;
    }
    addTask(text, user.id);
    setText("");
    navigate("/");
  };

  if (!user) {
    return <p>Please log in to manage your tasks.</p>;
  }

  const userTasks = tasks.filter((task) => task.userId === user.id);

  // Funkcija za spremanje editiranog taska
  const handleSaveEdit = () => {
    if (editId) {
      editTask(editId, editText);
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="todo-container">
      <h2>{editId ? "Edit Task" : "New Task"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editId) {
            handleSaveEdit();
          } else {
            handleAdd();
          }
        }}
      >
        <input
          value={editId ? editText : text}
          onChange={(e) =>
            editId ? setEditText(e.target.value) : setText(e.target.value)
          }
          placeholder={editId ? "Edit your task" : "Write your task"}
        />
        <button
          type="submit"
          disabled={(editId ? editText : text).trim() === ""}
        >
          {editId ? "Save" : "Add Task"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setEditText("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <div className="home-container">
        <UserTasks
          tasks={userTasks}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          editTask={editTask}
          editId={editId}
          setEditId={setEditId}
          setEditText={setEditText}
        />
      </div>
    </div>
  );
};

export default Todo;
