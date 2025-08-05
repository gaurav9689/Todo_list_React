// Import React and the useState hook
import React, { useState } from 'react';

// Functional component to represent each individual to-do item
// Props received: task (object), onDelete (function), onToggle (function), onEdit (function)
const ToDoItem = ({ task, onDelete, onToggle, onEdit }) => {
  // Local state to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state to track the updated text while editing
  const [editedText, setEditedText] = useState(task.text);

  // Function to handle editing of a task
  const handleEdit = () => {
    // If already editing and text is not empty, call onEdit to update the task
    if (isEditing && editedText.trim()) {
      onEdit(task.id, editedText);
    }
    // Toggle the editing state
    setIsEditing(!isEditing);
  };

  return (
    // Add a dynamic class "completed" if the task is marked as completed
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      
      {/* Checkbox to mark task as complete/incomplete */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)} // Call toggle function on change
      />

      {/* Conditional rendering:
          If editing, show input box with current editedText
          Otherwise, show task text as plain span */}
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)} // Update editedText on input change
        />
      ) : (
        <span>{task.text}</span> // Normal view
      )}

      {/* Edit and Delete buttons */}
      <div className="actions">
        {/* Edit toggles between 'Edit' and 'Save' */}
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>

        {/* Delete removes the task */}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

// Export the component so it can be used in the ToDoList component
export default ToDoItem;
