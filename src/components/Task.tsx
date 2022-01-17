import React, { useState } from 'react';
import axios from 'axios';

interface TaskProps {
    id: number;
    title: string;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

    function handleDeleteTask(event: any, taskId: number) {
        axios
            .delete(`http://localhost:3000/categories/${taskId}`)
            .then((result) => {
                console.log('success');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateTask(event: any, taskId: number) {
        axios
            .put(`http://localhost:3000/categories/${taskId}`, { title: `${taskToUpdate}` })
            .then((result) => {
                console.log('success');
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
            <form onSubmit={(e) => handleDeleteTask(e, props.id)}>
                <input type="submit" value="Delete Task" />
            </form>
            <form onSubmit={(e) => handleUpdateTask(e, props.id)}>
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
