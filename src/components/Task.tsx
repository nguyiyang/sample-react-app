import React, { useState } from 'react';
import axios from 'axios';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: any;
    priority: string;
    recurrence: string;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

    function handleDeleteTask(event: any, taskId: number) {
        axios
            .delete(`http://localhost:3000/categories/${props.categoryId}/tasks/${taskId}`)
            .then((result) => {
                props.fetchTasksList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateTask(event: any, taskId: number) {
        axios
            .put(`http://localhost:3000/categories/${props.categoryId}/tasks/${taskId}`, { title: `${taskToUpdate}` })
            .then((result) => {
                props.fetchTasksList();
                setTaskToUpdate('');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateChange(event: any) {
        setTaskToUpdate(event.target.value);
    }

    return (
        <div>
            <li>{props.title}</li>
            <li>{props.priority}</li>
            <li>{props.recurrence}</li>
            <form onSubmit={(e) => handleDeleteTask(e, props.taskId)}>
                <input type="submit" value="Delete Task" />
            </form>
            <form onSubmit={(e) => handleUpdateTask(e, props.taskId)}>
                <label>
                    {'Update title:\r'}
                    <input type="text" value={taskToUpdate} onChange={(e) => handleUpdateChange(e)} />
                </label>
                <input type="submit" value="Update Task" />
            </form>
        </div>
    );
};

export default Task;
