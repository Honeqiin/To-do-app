import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import Checkbox from "./Checkbox"; 
import {useEffect, useState} from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks((prev) => [...prev, { name: name, done: false }]);
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TO-DO</h1>
      </header>

      <main className="app-main">
        <h2>
          {numberComplete}/{numberTotal} Zrobione
        </h2>

        <TaskForm onAdd={addTask} />
        
        {tasks.length === 0 ? (
          <p className="empty-list">Pusto...</p>
        ) : (
          <div className="tasks">
            {tasks
              .filter((task) => (hideCompleted ? !task.done : true))
              .map((task, index) => (
                <Task
                  key={index}
                  {...task}
                  onRename={(newName) => renameTask(index, newName)}
                  onTrash={() => removeTask(index)}
                  onToggle={(done) => updateTaskDone(index, done)}
                />
              ))}
          </div>
        )}

        <div className="toggle-hide-completed">
          <Checkbox
            checked={hideCompleted}
            onClick={() => setHideCompleted((prev) => !prev)}
          />
          <span>Ukryj wykonane</span>
        </div>
      </main>

      <footer className="app-footer">
        <p>Częstochowska Karolina, 158006</p>
      </footer>
    </div>
  );
}


export default App;
