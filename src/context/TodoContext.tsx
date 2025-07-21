// src/context/TodoContext.tsx
import React, { createContext, useContext, useState } from "react";

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

type TodoContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleDone = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <TodoContext.Provider
      value={{ tasks, addTask, toggleDone, deleteTask, editTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used inside TodoProvider");
  return context;
};
