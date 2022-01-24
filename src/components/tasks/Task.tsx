import EditTaskTitle from './EditTaskTitle';
import EditTaskDetails from './EditTaskDetails';
import EditTaskRecurrence from './EditTaskRecurrence';
import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskProps {
    taskId: number;
    title: string;
    categoryId: number;
    fetchTasksList: () => void;
    priority: string;
    recurrence: string;
    priorityList: string[];
    recurrenceList: string[];
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {
    function handleDeleteTask(event: React.SyntheticEvent, taskId: number) {
        axios
            .delete(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${taskId}`)
            //.delete(`http://localhost:3000/categories/${props.categoryId}/tasks/${taskId}`)
            .then(() => {
                props.fetchTasksList();
            });
        event.preventDefault();
    }

    return (
        <>
            <EditTaskTitle
                taskId={props.taskId}
                title={props.title}
                categoryId={props.categoryId}
                recurrence={props.recurrence}
                priority={props.priority}
                fetchTasksList={props.fetchTasksList}
            />

            <EditTaskDetails
                taskId={props.taskId}
                title={props.title}
                categoryId={props.categoryId}
                fetchTasksList={props.fetchTasksList}
                priority={props.priority}
                options={props.priorityList}
            />

            <EditTaskRecurrence
                taskId={props.taskId}
                title={props.title}
                categoryId={props.categoryId}
                fetchTasksList={props.fetchTasksList}
                recurrence={props.recurrence}
                options={props.recurrenceList}
            />

            <td className="remove-task">
                <DeleteIcon onClick={(e) => handleDeleteTask(e, props.taskId)} />
            </td>
        </>
    );
};

export default Task;
