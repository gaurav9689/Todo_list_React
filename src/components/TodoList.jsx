// Import React for using JSX
import React from 'react';

// Import the ToDoItem component to render each individual task
import ToDoItem from './ToDoItem';

// Functional component ToDoList receives props:
// tasks (array), onDelete (function), onToggle (function), onEdit (function)
const ToDoList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    // Container div for the list of to-do items
    <div className="todo-list">
      {/* Map over each task and render a ToDoItem for it */}
      {tasks.map(task => (
        <ToDoItem
          key={task.id}         // Unique key for React's internal tracking
          task={task}           // The task object (id, text, completed)
          onDelete={onDelete}   // Delete handler passed down
          onToggle={onToggle}   // Toggle complete handler passed down
          onEdit={onEdit}       // Edit handler passed down
        />
      ))}
    </div>
  );
};

// Export the ToDoList component to be used in App.jsx
export default ToDoList;
