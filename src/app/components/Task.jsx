"use client";
import React, { useState, useEffect, useRef } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    try {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleAddTask = () => {
    console.log(tasks);
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        name: newTask,
        dateAdded: new Date().toLocaleString(),
        completed: false,
      };
      if(tasks==null){
        setTasks([task])
        localStorage.setItem("tasks", JSON.stringify([task]));
      }else{
        const newtasks = [...tasks, task];
        setTasks(newtasks);
        localStorage.setItem("tasks", JSON.stringify(newtasks));
      }
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    console.log(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // const showState = () => {
  //   console.log(tasks);
  // };
  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  function handleSort() {
    const tasksClone = [...tasks];
    const temp = tasksClone[dragItem.current];
    tasksClone[dragItem.current] = tasksClone[draggedOverItem.current];
    tasksClone[draggedOverItem.current] = temp;
    setTasks(tasksClone);
    localStorage.setItem("tasks", JSON.stringify(tasksClone));
  }

  return (
    <div className="w-fit flex-col gap-5">
      <h1 className="text-2xl">Task Tracker</h1>

      <div>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="text-black p-1"
        />
        <button
          className=" border border-x-0 border-r p-1 "
          onClick={handleAddTask}
        >
          Add Task
        </button>
        {/* <button className=" border border-r border-x-0 p-1 " onClick={showState}>show Task</button> */}
      </div>

      <div>
        <label>
          Show Completed:
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={() => setFilterCompleted(!filterCompleted)}
          />
        </label>
      </div>

      <ul className="">
        {tasks
          ?.filter((task) => (filterCompleted ? task.completed : true))
          .map((task, index) => (
            <li
              key={task.id}
              className="bg-slate-500 w-100% rounded m-2 flex  justify-between text-center items-center p-2 "
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (draggedOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
              <div className="flex-col">
                <div>
                  <button
                    className="bg-red-600 m-1 rounded p-1"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="m-1 rounded p-1"
                    style={{
                      backgroundColor: task.completed ? "green" : "orange",
                    }}
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.completed ? "Done" : "Pending"}
                  </button>
                </div>
                <div className="text-xs bg-black rounded p-1">
                  {task.dateAdded}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Task;
