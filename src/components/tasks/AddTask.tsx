import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface AddTask {
    id: number;
    fetchTasksList: any;
    priorityList: string[];
    recurrenceList: string[];
}

interface Error {
    message: string;
}

const AddTask: React.FC<AddTask> = (props: AddTask) => {
    const [taskToAdd, setTaskToAdd] = useState('');
    const [priorityToAdd, setPriorityToAdd] = useState('low');
    const [recurrenceToAdd, setRecurrenceToAdd] = useState('daily');
    const [error, setError] = useState<Error>();

    function handleAddTask(event: React.SyntheticEvent) {
        axios
            .post(`http://localhost:3000/categories/${props.id}/tasks`, {
                title: `${taskToAdd}`,
                category_id: `${props.id}`,
                priority: `${priorityToAdd}`,
                recurrence: `${recurrenceToAdd}`,
            })
            .then(() => {
                alert('success');
                props.fetchTasksList();
                setTaskToAdd('');
            })
            .catch((error) => setError(error.response.data.message));
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
        <form onSubmit={(e) => handleAddTask(e)}>
            <label>
                {'Add task title:\r'}
                <input type="text" value={taskToAdd} onChange={(e) => handleAddTaskChange(e)} />
                <br></br>
                <label>
                    {'Priority:\r'}
                    <select value={priorityToAdd} onChange={(e) => handleAddPriorityChange(e)}>
                        {props.priorityList.map((priority, key) => (
                            <option key={key} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </label>
                <br></br>
                <label>
                    {'Recurrence:\r'}
                    <select value={recurrenceToAdd} onChange={(e) => handleAddRecurrenceChange(e)}>
                        {props.recurrenceList.map((recurrence, key) => (
                            <option key={key} value={recurrence}>
                                {recurrence}
                            </option>
                        ))}
                    </select>
                </label>
            </label>
            <input type="submit" value="Add Task" />
        </form>
    );
};

export default AddTask;
