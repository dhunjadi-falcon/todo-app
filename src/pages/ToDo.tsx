import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Todo.scss";
import UserTasks from "../components/UsersTask";
import { useNavigate } from "react-router";

const Todo = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { addTask, tasks, toggleDone, deleteTask, editTask } = useTodoContext();
  const { user } = useLoginContext();

  if (!user) {
    return <p>Please log in to manage your tasks.</p>;
  }

  const userTasks = tasks.filter((task) => task.userId === user.id);

  const handleAdd = () => {
    if (!user) {
      alert("You have to be logged in in order to be able to add a task");
      return;
    }
    addTask(text, user.id);
    setText("");
    navigate("/");
  };

  return (
    <div className="todo-container">
      <h2>{editId ? "Edit Task" : "New Task"}</h2>
      {!editId && (
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
        </form>
      )}

      <hr />

      <div className="home-container">
        <UserTasks
          tasks={userTasks}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          editTask={editTask}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
    </div>
  );
};

export default Todo;
