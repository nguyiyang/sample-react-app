import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: () => void;
    recurrence: string;
    options: string[];
}

const EditTaskRecurrence: React.FC<TaskProps> = (props: TaskProps) => {
    const [taskToUpdate, setTaskToUpdate] = useState(props.recurrence);
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateTaskRecurrence(event: string) {
        axios
            .put(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${props.taskId}`, {
                recurrence: event,
            })
            //.put(`http://localhost:3000/categories/${props.categoryId}/tasks/${taskId}`, { title: `${taskToUpdate}` })
            .then(() => {
                props.fetchTasksList();
                setTaskToUpdate(props.recurrence);
                setIsEditing(false);
            });
    }

    function handleUpdateRecurrenceChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setTaskToUpdate(event.target.value);
        handleUpdateTaskRecurrence(event.target.value);
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
                        <select value={taskToUpdate} onChange={(e) => handleUpdateRecurrenceChange(e)}>
                            {props.options.map((priority, key) => (
                                <option key={key} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p onClick={handleClick}>{props.recurrence}</p>
                    )}
                </div>
            </ClickAwayListener>
        </td>
    );
};

export default EditTaskRecurrence;
