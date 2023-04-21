import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
   const [tasks,setTasks] = useState(
        [{
            id: 1,
            text: "Doctors Appointment",
            day: "Feb 5th at 2:30pm",
            reminder: true,
        },
        {
            id: 2,
            text: "Meeting at School",
            day: "Feb 6th at 1:30pm",
            reminder: true,
        },
        {
            id: 3,
            text: "Food Shopping",
            day: "Feb 5th at 2:30pm",
            reminder: true,
        }
    ]
    )

    //Delete a task
    function deleteTask(id) {
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
      <Header />
      <AddTask />
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
