import DeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';
import AddTask from '../tasks/AddTask';
import FilterTask from '../tasks/FilterTask';
import Error from '../Error';
import Task from '../tasks/Task';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CategoryProps {
    id: number;
    title: string;
    fetchCategoryList: () => void;
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [priorityList, setPriorityList] = useState<string[]>([]);
    const [recurrenceList, setRecurrenceList] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const [viewTasks, setViewTasks] = useState<Task[]>([]);

    const fetchTasksList = () => {
        axios
            .get(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.id}/tasks`)
            .then((result) => {
                console.log(props.id);
                setTasks(result.data.tasks);
                setViewTasks(result.data.tasks);
                setPriorityList(result.data.priorities);
                setRecurrenceList(result.data.recurrences);
            })
            .catch((error) => setError(error));
    };

    useEffect(fetchTasksList, []);

    const addTaskProps = {
        id: props.id,
        fetchTasksList: fetchTasksList,
        priorityList: priorityList,
        recurrenceList: recurrenceList,
        setError: setError,
    };

    return (
        <div>
            <DeleteCategory id={props.id} fetchCategoryList={props.fetchCategoryList} />
            <UpdateCategory id={props.id} title={props.title} fetchCategoryList={props.fetchCategoryList} />

            <FilterTask id={props.id} setViewTasks={setViewTasks} tasks={tasks} />

            <table>
                <tr>
                    <th className="th-description">{'Task '}</th>
                    <th className="th-details">{'Priority '}</th>
                    <th className="th-details">{'Recurrence '}</th>
                    <th></th>
                </tr>
                {viewTasks.map((item) => (
                    <tr key={item.id}>
                        <Task
                            taskId={item.id}
                            title={item.title}
                            categoryId={props.id}
                            recurrence={item.recurrence}
                            priority={item.priority}
                            fetchTasksList={fetchTasksList}
                            priorityList={priorityList}
                            recurrenceList={recurrenceList}
                        />
                    </tr>
                ))}
                <tr>
                    <AddTask {...addTaskProps} />
                </tr>
            </table>
            <Error message={error} setError={setError} />
        </div>
    );
};

export default Category;
