import { FaTimes} from "react-icons/fa"



export default function Task({ task, onDelete, id}) {

    return (
        <div className="task">
            <h3>{task.text} <FaTimes 
            style={{color: "red", cursor: "pointer"}}
            onClick={() => {
                onDelete(id)
            }}
            /></h3>
            <p>{task.day}</p>
        </div>
    )
}