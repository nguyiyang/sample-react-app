import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: () => void;
    priority: string;
    recurrence: string;
}

const EditTaskTitle: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const [error, setError] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateTaskTitle(event: React.SyntheticEvent) {
        axios
            .put(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${props.taskId}`, {
                title: `${taskToUpdate}`,
            })
            .then(() => {
                props.fetchTasksList();
                setTaskToUpdate('');
                setIsEditing(false);
            })
            .catch((error) => setError(error.response.data.message));
        event.preventDefault();
    }

    function handleUpdateTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTaskToUpdate(event.target.value);
    }

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleClickAway = () => {
        setIsEditing(false);
    };

    return (
        <td className="td-description">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {isEditing ? (
                        <form onSubmit={(e) => handleUpdateTaskTitle(e)}>
                            <input size={5} onChange={(e) => handleUpdateTitleChange(e)} />
                        </form>
                    ) : (
                        <p onClick={handleClick}>{props.title}</p>
                    )}
                </div>
            </ClickAwayListener>
        </td>
    );
};

export default EditTaskTitle;
