import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";


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

  //Fetch Task

  async function fetchTask(id) {
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`
      )

    const data = await res.json()

    return data
  }

    //Add Task
    async function addTask(task) {
      const res = await fetch(
        'http://localhost:5000/tasks',
         {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(task)
      })

      const data = await res.json()

      setTasks([...tasks, data])
      // const id = Math.floor(Math.random() * 1000) + 1
      // const newTask = {
      //   id, 
      //   ...task
      // }
      // setTasks([
      //   ...tasks,
      //   newTask
      // ])
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
    async function toggleReminder(id) {
      const taskToToggle = await fetchTask(id)
      const updTask = {
        ...taskToToggle,
        reminder: !taskToToggle.reminder
      }

      const res = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updTask)
        })

        const data = await res.json()

      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            reminder: data.reminder
          }
        } else {
          return task
        }
      }))
    }
    
    
  return (
    <Router>
    <div className="container">
      <Header onAdd={() => 
      setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      <Routes>
      <Route 
      path="/"  
      element={<>
        {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ?
      (<Tasks 
      tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder}
      />) : (
        "No Tasks Available"
        )}
        </>}
      />
      <Route path="/about" element={<About />}/>
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
