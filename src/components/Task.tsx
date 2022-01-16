import React, { useState } from 'react';
import axios from 'axios';

interface TaskProps {
    id: number;
    title: string;
    fetchTasksList: any;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

    function handleDelete(event: any, taskId: number) {
        axios
            .delete(`http://localhost:3000/tasks/${taskId}`)
            .then((result) => {
                console.log('success');
                props.fetchTasksList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdate(event: any, taskId: number) {
        axios
            .put(`http://localhost:3000/tasks/${taskId}`, { title: `${taskToUpdate}` })
            .then((result) => {
                console.log('success');
                props.fetchTasksList();
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
            <form onSubmit={(e) => handleDelete(e, props.id)}>
                <input type="submit" value="Delete" />
            </form>
            <form onSubmit={(e) => handleUpdate(e, props.id)}>
                <label>
                    {'Update title:\r'}
                    <input type="text" value={taskToUpdate} onChange={(e) => handleUpdateChange(e)} />
                </label>
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Task;
