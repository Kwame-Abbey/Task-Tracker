import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
   const [tasks,setTasks] = useState([])


  useEffect(() => {
  async  function getTasks() {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks

  async function fetchTasks() {
    const res = await fetch(
      "http://localhost:5000/tasks"
      )

    const data = await res.json()

    return data
  }
    //Add Task
    function addTask(task) {
      const id = Math.floor(Math.random() * 1000) + 1
      const newTask = {
        id, 
        ...task
      }
      setTasks([
        ...tasks,
        newTask
      ])
    }

    //Delete a task
    async function deleteTask(id) {

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE"
      })

      setTasks(prevItems => {
        return prevItems.filter(task => {
          return task.id !== id
        })
      })
    }

    //Toggle Reminder
    function toggleReminder(id) {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            reminder: !task.reminder
          }
        } else {
          return task
        }
      }))
    }
    
    
  return (
    <div className="container">
      <Header onAdd={() => 
      setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ?
      (<Tasks 
      tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder}
      />) : (
        "No Tasks Available"
        )}
    </div>
  );
}

export default App;
