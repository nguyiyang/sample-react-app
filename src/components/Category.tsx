import Task from './Task';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CategoryProps {
    id: number;
    title: string;
    fetchCategoryList: any;
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskToAdd, setTaskToAdd] = useState('');
    const [priorityToAdd, setPriorityToAdd] = useState('low');
    const [priorityList, setPriorityList] = useState<string[]>([]);
    const [recurrenceToAdd, setRecurrenceToAdd] = useState('daily');
    const [recurrenceList, setRecurrenceList] = useState<string[]>([]);
    const [sortValue, setSortValue] = useState('priority');
    const [categoryToUpdate, setCategoryToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

    const [viewTasks, setViewTasks] = useState<Task[]>([]);
    const [value, setValue] = useState('');

    const fetchTasksList = () => {
        axios
            //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
            .get(`http://localhost:3000/categories/${props.id}/tasks`)
            .then((result) => {
                console.log(result.data);
                setTasks(result.data.tasks);
                setViewTasks(result.data.tasks);
                setPriorityList(result.data.priorities);
                setRecurrenceList(result.data.recurrences);
            })
            .catch((error) => setError(error));
    };

    useEffect(fetchTasksList, []);

    function handleAddTask(event: any) {
        axios
            .post(`http://localhost:3000/categories/${props.id}/tasks`, {
                title: `${taskToAdd}`,
                category_id: `${props.id}`,
                priority: `${priorityToAdd}`,
                recurrence: `${recurrenceToAdd}`,
            })
            .then((result) => {
                alert('success');
                fetchTasksList();
                setTaskToAdd('');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleAddTaskChange(event: any) {
        setTaskToAdd(event.target.value);
    }

    function handleAddRecurrenceChange(event: any) {
        setRecurrenceToAdd(event.target.value);
    }

    function handleAddPriorityChange(event: any) {
        setPriorityToAdd(event.target.value);
    }

    function handleDeleteCategory(event: any, categoryId: number) {
        axios
            .delete(`http://localhost:3000/categories/${categoryId}`)
            .then((result) => {
                props.fetchCategoryList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateCategory(event: any, categoryId: number) {
        axios
            .put(`http://localhost:3000/categories/${categoryId}`, { title: `${categoryToUpdate}` })
            .then((result) => {
                props.fetchCategoryList();
                setCategoryToUpdate('');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateChange(event: any) {
        setCategoryToUpdate(event.target.value);
    }

    function handleSearchChange(event: any) {
        setValue(event.target.value);
    }

    function handleSearch(event: any) {
        const search: string = value;
        setViewTasks([]);
        if (search == '') {
            setViewTasks(tasks);
        } else {
            axios
                //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
                .get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks/search/${value}`)
                .then((result) => {
                    setViewTasks(result.data);
                })
                .catch((error) => setError(error));
        }
        event.preventDefault();
    }

    function handleSortChange(event: any) {
        setSortValue(event.target.value);
    }

    function handleSort(event: any) {
        axios
            .get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks/sort/${sortValue}`)
            .then((result) => {
                setViewTasks(result.data);
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    return (
        <div>
            <li>{props.title}</li>
            <form onSubmit={(e) => handleDeleteCategory(e, props.id)}>
                <input type="submit" value="Delete Category" />
            </form>
            <form onSubmit={(e) => handleUpdateCategory(e, props.id)}>
                <label>
                    {'Update category title:\r'}
                    <input type="text" value={categoryToUpdate} onChange={(e) => handleUpdateChange(e)} />
                </label>
                <input type="submit" value="Update Category" />
            </form>
            <ul>
                {viewTasks.map((item) => (
                    <div key={item.id}>
                        <Task
                            taskId={item.id}
                            title={item.title}
                            categoryId={props.id}
                            recurrence={item.recurrence}
                            priority={item.priority}
                            fetchTasksList={fetchTasksList}
                        />
                    </div>
                ))}
            </ul>

            <form onSubmit={(e) => handleSearch(e)}>
                <label>
                    {'Search:\r'}
                    <input type="text" value={value} onChange={(e) => handleSearchChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <br></br>

            <form onSubmit={(e) => handleSort(e)}>
                <label>
                    {'Sort by:\r'}
                    <select value={sortValue} onChange={(e) => handleSortChange(e)}>
                        <option value="priority">{'priority\r'}</option>
                        <option value="recurrence">{'recurrence\r'}</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={(e) => handleAddTask(e)}>
                <label>
                    {'Add task title:\r'}
                    <input type="text" value={taskToAdd} onChange={(e) => handleAddTaskChange(e)} />
                    <br></br>
                    <label>
                        {'Priority:\r'}
                        <select value={priorityToAdd} onChange={(e) => handleAddPriorityChange(e)}>
                            {priorityList.map((priority, key) => (
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
                            {recurrenceList.map((recurrence, key) => (
                                <option key={key} value={recurrence}>
                                    {recurrence}
                                </option>
                            ))}
                        </select>
                    </label>
                </label>
                <input type="submit" value="Add Task" />
            </form>
        </div>
    );
};

export default Category;
