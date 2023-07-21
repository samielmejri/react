import React, { useState, useEffect } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      addTodo(parsedTasks);
    }
  }, []); // Empty dependency array to run only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue('');

      // Save tasks to local storage
      const savedTasks = localStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      tasks.push(value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
