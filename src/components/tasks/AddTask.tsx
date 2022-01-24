import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface AddTask {
    id: number;
    fetchTasksList: () => void;
    priorityList: string[];
    recurrenceList: string[];
    setError: (value: string) => void;
}

const AddTask: React.FC<AddTask> = (props: AddTask) => {
    const [taskToAdd, setTaskToAdd] = useState('');
    const [priorityToAdd, setPriorityToAdd] = useState('low');
    const [recurrenceToAdd, setRecurrenceToAdd] = useState('daily');

    function handleAddTask(event: React.SyntheticEvent) {
        axios
            .post(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.id}/tasks`, {
                title: `${taskToAdd}`,
                category_id: `${props.id}`,
                priority: `${priorityToAdd}`,
                recurrence: `${recurrenceToAdd}`,
            })
            // .post(`http://localhost:3000/categories/${props.id}/tasks`, {
            //     title: `${taskToAdd}`,
            //     category_id: `${props.id}`,
            //     priority: `${priorityToAdd}`,
            //     recurrence: `${recurrenceToAdd}`,
            // })
            .then(() => {
                props.setError('');
                props.fetchTasksList();
                setTaskToAdd('');
                setRecurrenceToAdd('daily');
                setPriorityToAdd('low');
            })
            .catch((error) => props.setError(error.response.data.message));
        event.preventDefault();
    }

    function handleAddTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setTaskToAdd(event.target.value);
    }

    function handleAddRecurrenceChange(event: ChangeEvent<HTMLSelectElement>) {
        setRecurrenceToAdd(event.target.value);
    }

    function handleAddPriorityChange(event: ChangeEvent<HTMLSelectElement>) {
        setPriorityToAdd(event.target.value);
    }

    return (
        <>
            <td>
                <input
                    type="text"
                    placeholder="Add a task.."
                    size={6}
                    value={taskToAdd}
                    onChange={(e) => handleAddTaskChange(e)}
                />
            </td>
            <td>
                <select value={priorityToAdd} onChange={(e) => handleAddPriorityChange(e)}>
                    {props.priorityList.map((priority, key) => (
                        <option key={key} value={priority}>
                            {priority}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select value={recurrenceToAdd} onChange={(e) => handleAddRecurrenceChange(e)}>
                    {props.recurrenceList.map((recurrence, key) => (
                        <option key={key} value={recurrence}>
                            {recurrence}
                        </option>
                    ))}
                </select>
            </td>
            <td className="remove-task">
                <AddIcon onClick={(e) => handleAddTask(e)} />
            </td>
        </>
    );
};

export default AddTask;
