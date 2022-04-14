
import { FaTimes } from 'react-icons/fa';

const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        <>
            {
                (tasks && tasks.length > 0) ? tasks.map(task => (
                    <div className={`task ${task.reminder ? 'reminder' : ''}`} onClick={() => onToggle(task.id)} key={task.id} >
                        <h3>{task.text} <FaTimes style={{ color: 'red' }} onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id)
                        }} /> </h3>
                        <p>{task.day}</p>
                    </div>
                ))
                    : "No Tasks Found!"}
        </>
    );
}

export default Tasks;