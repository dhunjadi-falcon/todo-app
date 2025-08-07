import { type Dispatch, type SetStateAction } from "react";

import EditTaskForm from "../components/EditTaskForm";

type Task = {
  id: string;
  userId: string;
  text: string;
  done: boolean;
};

type UserTasksProps = {
  tasks: Task[];
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  editId: string | null;
  setEditId: Dispatch<SetStateAction<string | null>>;
  setEditText: Dispatch<SetStateAction<string>>;
};

const UserTasks = ({
  tasks,
  toggleDone,
  deleteTask,
  editTask,
  editId,
  setEditId,
  setEditText,
}: UserTasksProps) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
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
                  setEditText(task.text);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserTasks;
