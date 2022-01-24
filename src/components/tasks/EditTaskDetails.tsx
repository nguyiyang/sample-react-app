import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: () => void;
    priority: string;
    options: string[];
}

const EditTaskDetails: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState(props.priority);
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateTaskDetails(event: string) {
        axios
            .put(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${props.taskId}`, {
                priority: event,
            })
            //.put(`http://localhost:3000/categories/${props.categoryId}/tasks/${taskId}`, { title: `${taskToUpdate}` })
            .then(() => {
                props.fetchTasksList();
                setTaskToUpdate(props.priority);
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
                        <p onClick={handleClick}>{props.priority}</p>
                    )}
                </div>
            </ClickAwayListener>
        </td>
    );
};

export default EditTaskDetails;
