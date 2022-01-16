import Task from './Task';
import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BasicList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [value, setValue] = useState('');
    const [viewTasks, setViewTasks] = useState<Task[]>(tasks);
    const [taskToAdd, setTaskToAdd] = useState('');

    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    interface Task {
        id: number;
        title: string;
    }

    const fetchTasksList = () => {
        axios
            //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
            .get<Task[]>('http://localhost:3000/tasks')
            .then((result) => {
                setIsLoaded(true);
                setTasks(result.data);
                setViewTasks(result.data);
            })
            .catch((error) => setError(error));
    };

    useEffect(fetchTasksList, []);

    function handleChange(event: any) {
        setValue(event.target.value);
    }

    function handleSubmit(event: any) {
        const search: string = value;
        setViewTasks([]);
        const updateTaskView: Task[] = [];
        if (search == '') {
            setViewTasks(tasks);
        } else {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].title.toLowerCase().includes(search)) {
                    updateTaskView.push(tasks[i]);
                }
            }
            setViewTasks(updateTaskView);
        }
        console.log(updateTaskView);
        event.preventDefault();
    }

    // add task form event handlers

    function addTaskHandleChange(event: any) {
        setTaskToAdd(event.target.value);
    }

    function addTask(event: any) {
        axios
            .post('http://localhost:3000/tasks', { title: taskToAdd })
            .then((result) => {
                console.log('success');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    if (error) {
        return (
            <div>
                {'Error: '}
                {error.message}
            </div>
        );
    } else if (!isLoaded) {
        return <div>{'Loading...'}</div>;
    } else {
        return (
            <div style={{ width: '25vw', margin: 'auto', textAlign: 'center' }}>
                <h4>{'Some web development tools/concepts:'}</h4>
                <ul>
                    {viewTasks.map((item) => (
                        <div key={item.id}>
                            <Task id={item.id} title={item.title} fetchTasksList={fetchTasksList} />
                        </div>
                    ))}
                </ul>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        {'Search:\r'}
                        <input type="text" value={value} onChange={(e) => handleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <form onSubmit={(e) => addTask(e)}>
                    <label>
                        {'Add Task:\r'}
                        <input type="text" value={taskToAdd} onChange={(e) => addTaskHandleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default BasicList;
