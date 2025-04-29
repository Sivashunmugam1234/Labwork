import { useState, useRef } from "react";

// Define a Task interface for better type safety
interface Task {
  id: number;
  text: string;
}

export default function Todo2() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Generate unique IDs for tasks
  const getNextId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  };

  const handleAddOrUpdateTask = () => {
    if (!inputRef.current || inputRef.current.value.trim() === "") return;
    
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, text: inputRef.current!.value } : task
      ));
      setEditingTask(null);
    } else {
      // Add new task
      const newTask: Task = {
        id: getNextId(),
        text: inputRef.current.value
      };
      setTasks([...tasks, newTask]);
    }
    
    // Clear input field
    inputRef.current.value = "";
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    if (inputRef.current) {
      inputRef.current.value = task.text;
      inputRef.current.focus();
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    // If we're currently editing this task, clear the edit state
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text" 
          ref={inputRef} 
          className="border-2 rounded px-2 py-1 flex-grow" 
          placeholder="Enter a task"
        />
        <button 
          onClick={handleAddOrUpdateTask}
          className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editingTask ? "Update" : "Add"}
        </button>
        {editingTask && (
          <button 
            onClick={handleCancelEdit}
            className="ml-2 bg-gray-500 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center border p-2 rounded">
            <span className="flex-grow">{task.text}</span>
            <button 
              onClick={() => handleEditTask(task)}
              className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No tasks yet. Add a task to get started!</p>
      )}
    </div>
  );
}