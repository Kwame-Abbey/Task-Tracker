import Task from "./Task"

export default function Tasks({ tasks, onDelete}) {
   
    
    return (
        <>
        {tasks.map(task => (
            <Task 
            key={task.id} 
            id={task.id}
            task={task}
            onDelete={onDelete}
            />))}
        </>
    )
}