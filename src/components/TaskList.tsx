
import './TaskList.css';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Task } from '../types';
import OneTask from './Task';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const TaskListWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 2rem auto;
min-width: 700px;
`


let listJob = [
    {
        id: 1,
        text: "выучить JS",
        completed: false,
    },

    {
        id: 2,
        text: "выучить CSS",
        completed: false,
    }
];

const TaskList: React.FC = () => {

    let localListJob: Task[];
    // проверяем, есть данные в localStorage, если нет берем из массива
    if (localStorage.getItem("listJob") === null || localStorage.getItem("listJob") === "[]") {
        localListJob = listJob;
    } else {
        localListJob = JSON.parse(localStorage.getItem("listJob") || '""')
    }



    const [tasks, setTasks] = useState<Task[]>(localListJob);
    const [taskText, setTaskText] = useState<string>('');

    const addTask = (text: string) => {
        const newTask: Task = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            text,
            completed: false,
        }
        setTasks([...tasks, newTask]);
        setTaskText('');
        localStorage.clear();
        localStorage.setItem('listJob', JSON.stringify([...tasks, newTask]));

    }

    const toggeleTask = (id: number) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
        let res = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
        localStorage.clear();
        localStorage.setItem('listJob', JSON.stringify([...res]));
    }

    const removeTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));

        let res = tasks.filter((task) => task.id !== id);
        localStorage.setItem('listJob', JSON.stringify([...res]));
        if (res.length === 0) {
          localStorage.clear();
        }
    }



    return (
        <TaskListWrapper>
            <h1>Список задач</h1>
            <input className="myInp" type="text" value={taskText} onChange={(e => setTaskText(e.target.value))} />
            <button onClick={() => addTask(taskText)} className="list__btn"> Добавить задачу</button>
            <TransitionGroup >
                {tasks.map((task) => (
                    <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="item"
                    >
                        <OneTask task={task} toggeleTask={toggeleTask} removeTask={removeTask} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </TaskListWrapper >
    )
}

export default TaskList;

