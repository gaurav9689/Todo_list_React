// Import necessary React features and components
import React, { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/TodoList';

// Main App Component
const App = () => {
  // State to manage list of tasks
  const [tasks, setTasks] = useState([]);

  // State for input field value
  const [input, setInput] = useState('');

  // State for top message (success/error)
  const [message, setMessage] = useState({ text: '', type: '' });

  // Utility to show top messages with optional type ('success' or 'error')
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });

    // Auto-clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  // Function to add a new task
  const addTask = () => {
    if (input.trim() === '') {
      showMessage(' Task cannot be empty!', 'error');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setInput('');
    showMessage(' Task added successfully!');
  };

  // Function to delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showMessage(' Task deleted successfully!', 'success');
  };

  // Function to toggle completion status
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Function to edit a task's text
  const editTask = (id, newText) => {
    if (newText.trim() === '') {
      showMessage(' Task text cannot be empty!', 'error');
      return;
    }

    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, text: newText }
        : task
    ));

    showMessage(' Task updated successfully!');
  };

  return (
    <div className="app">
      {/* App header */}
      <Header />

      {/* Top floating message (success/error) */}
      {message.text && (
        <div className={`top-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Input field and Add button */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Render the ToDoList component with task props */}
      <ToDoList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
};

export default App;
