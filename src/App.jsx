import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [draggedTask, setDraggedTask] = useState({});
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        todo: currentTask,
        id: Date.now() + Math.floor(Math.random() * 1000),
      },
    ]);
    setCurrentTask("");
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetSection) => {
    e.preventDefault();

    // Remove dragged task from all sections
    setTodos((prev) => prev.filter((item) => item.id !== draggedTask.id));
    setOngoingTasks((prev) =>
      prev.filter((item) => item.id !== draggedTask.id)
    );
    setCompletedTasks((prev) =>
      prev.filter((item) => item.id !== draggedTask.id)
    );

    // Add to the target section
    if (targetSection === "todos") {
      setTodos((prev) => [...prev, draggedTask]);
    } else if (targetSection === "ongoing") {
      setOngoingTasks((prev) => [...prev, draggedTask]);
    } else if (targetSection === "completed") {
      setCompletedTasks((prev) => [...prev, draggedTask]);
    }

    setDraggedTask({});
  };

  return (
    <div className="bg-zinc-900 h-screen w-full flex flex-col gap-10">
      {/* Add Task Form */}
      <form className="h-10 flex gap-5 mt-5 justify-center">
        <input
          type="text"
          className="border-2 border-white rounded-lg text-white p-2 bg-transparent"
          onChange={(e) => setCurrentTask(e.target.value)}
          value={currentTask}
          placeholder="Enter a task"
        />
        <button
          className="bg-blue-600 rounded-lg p-2 text-white cursor-pointer"
          onClick={handleAddTask}
        >
          Add
        </button>
      </form>

      {/* Task Columns */}
      <div className="flex flex-row justify-between mx-5">
        {/* To-Do Column */}
        <div
          className="border-2 border-white rounded-lg text-white px-4 w-1/3"
          onDrop={(e) => onDrop(e, "todos")}
          onDragOver={onDragOver}
        >
          <h1 className="text-white font-bold text-xl mb-2">To-Do</h1>
          {todos.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo)}
              className="hover:border-2 border-yellow-300 rounded-sm cursor-grab active:cursor-grabbing mb-2 p-2"
            >
              <li>
                {todo.id}. {todo.todo}
              </li>
            </div>
          ))}
        </div>

        {/* Ongoing Column */}
        <div
          className="border-2 border-white rounded-lg text-white px-4 w-1/3"
          onDrop={(e) => onDrop(e, "ongoing")}
          onDragOver={onDragOver}
        >
          <h1 className="text-white font-bold text-xl mb-2">Ongoing</h1>
          {ongoingTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              className="hover:border-2 border-yellow-300 rounded-sm cursor-grab active:cursor-grabbing mb-2 p-2"
            >
              <li>
                {task.id}. {task.todo}
              </li>
            </div>
          ))}
        </div>

        {/* Completed Column */}
        <div
          className="border-2 border-white rounded-lg text-white px-4 w-1/3"
          onDrop={(e) => onDrop(e, "completed")}
          onDragOver={onDragOver}
        >
          <h1 className="text-white font-bold text-xl mb-2">Completed</h1>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              className="text-green-500 mb-2 p-2 hover:cursor-grab active:cursor-grabbing"
            >
              <li>
                {task.id}. {task.todo}
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
