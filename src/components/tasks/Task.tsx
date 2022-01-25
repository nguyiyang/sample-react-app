import EditTaskTitle from './EditTaskTitle';
import EditTaskDetails from './EditTaskDetails';
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
        axios.delete(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.categoryId}/tasks/${taskId}`).then(() => {
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
                detail={props.priority}
                options={props.priorityList}
                type="priority"
            />

            <EditTaskDetails
                taskId={props.taskId}
                title={props.title}
                categoryId={props.categoryId}
                fetchTasksList={props.fetchTasksList}
                detail={props.recurrence}
                options={props.recurrenceList}
                type="recurrence"
            />

            <td className="remove-task">
                <DeleteIcon onClick={(e) => handleDeleteTask(e, props.taskId)} />
            </td>
        </>
    );
};

export default Task;
