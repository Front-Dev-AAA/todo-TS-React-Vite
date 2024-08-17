import './Task.css';
import { Task } from '../types';
import styled from 'styled-components';


interface TaskProps {
    task: Task;
    toggeleTask: (id: number) => void;
    removeTask: (id: number) => void;
}

const TaskItem = styled.div<{ completed: boolean }> ` 
  text-decoration: ${({ completed }) => (completed ? "Line-through" : "none")};
`

const OneTask: React.FC<TaskProps> = ({ task, toggeleTask, removeTask }) => {

    return (

        <div className="one-task">
            <TaskItem completed={task.completed} className="one-task-flex">
                <input className="task__inp" type="checkbox" checked={task.completed} onChange={() => toggeleTask(task.id)} />
                <p className="decr"> {task.text}</p>
            </TaskItem>
            <button className="task__btn" onClick={() => removeTask(task.id)}> удалить</button>
        </div>

    )
}

export default OneTask;