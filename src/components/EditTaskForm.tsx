import { useState } from "react";

type EditTaskFormProps = {
  taskId: string;
  initialText: string;
  onSave: (id: string, newText: string) => void;
  onCancel: () => void;
};

const EditTaskForm = ({
  taskId,
  initialText,
  onSave,
  onCancel,
}: EditTaskFormProps) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSave(taskId, text.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "inline",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Edit your task"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
