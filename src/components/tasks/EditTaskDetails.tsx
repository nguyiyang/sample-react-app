import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: () => void;
    detail: string;
    options: string[];
    type: string;
}

const EditTaskDetails: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState(props.detail);
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateTaskDetails(event: string) {
        const data = {
            ...(props.type == 'priority' && { priority: event }),
            ...(props.type == 'recurrence' && { recurrence: event }),
        };
        axios
            .put(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${props.taskId}`, data)
            .then(() => {
                props.fetchTasksList();
                setTaskToUpdate(props.detail);
                setIsEditing(false);
            });
    }

    function handleUpdateDetailsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setTaskToUpdate(event.target.value);
        handleUpdateTaskDetails(event.target.value);
        event.preventDefault;
    }

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleClickAway = () => {
        setIsEditing(false);
    };

    return (
        <td className="td-details">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {isEditing ? (
                        <select value={taskToUpdate} onChange={(e) => handleUpdateDetailsChange(e)}>
                            {props.options.map((priority, key) => (
                                <option key={key} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p onClick={handleClick}>{props.detail}</p>
                    )}
                </div>
            </ClickAwayListener>
        </td>
    );
};

export default EditTaskDetails;
