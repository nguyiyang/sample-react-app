import React, { useState } from 'react';
import axios from 'axios';

interface TaskProps {
    id: number;
    title: string;
    fetchTasksList: any;
}

const UpdateTaskForm: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

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
        <form onSubmit={(e) => handleUpdate(e, props.id)}>
            <label>
                {'Update title:\r'}
                <input type="text" value={taskToUpdate} onChange={(e) => handleUpdateChange(e)} />
            </label>
            <input type="submit" value="Update" />
        </form>
    );
};

export default UpdateTaskForm;
