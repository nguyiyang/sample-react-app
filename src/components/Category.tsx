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
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskToAdd, setTaskToAdd] = useState('');
    const [categoryToUpdate, setCategoryToUpdate] = useState('');
    const [error, setError] = useState<any>(null);

    const [viewTasks, setViewTasks] = useState<Task[]>([]);
    const [value, setValue] = useState('');

    const fetchTasksList = () => {
        axios
            //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
            .get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks`)
            .then((result) => {
                setTasks(result.data);
                setViewTasks(result.data);
            })
            .catch((error) => setError(error));
    };

    useEffect(fetchTasksList, []);

    function handleAddTask(event: any) {
        axios
            .post(`http://localhost:3000/categories/${props.id}/tasks`, {
                title: `${taskToAdd}`,
                category_id: `${props.id}`,
            })
            .then((result) => {
                alert('success');
                fetchTasksList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleAddTaskChange(event: any) {
        setTaskToAdd(event.target.value);
    }

    function handleDeleteCategory(event: any, categoryId: number) {
        axios
            .delete(`http://localhost:3000/categories/${categoryId}`)
            .then((result) => {
                console.log('success');
                props.fetchCategoryList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateCategory(event: any, categoryId: number) {
        axios
            .put(`http://localhost:3000/categories/${categoryId}`, { title: `${categoryToUpdate}` })
            .then((result) => {
                console.log('success');
                props.fetchCategoryList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateChange(event: any) {
        setCategoryToUpdate(event.target.value);
    }

    function handleChange(event: any) {
        setValue(event.target.value);
    }

    function handleSubmit(event: any) {
        const search: string = value;
        setViewTasks([]);
        const updateTaskView: Task[] = [];
        if (search == '') {
            setViewTasks(tasks);
        } else {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].title.toLowerCase().includes(search)) {
                    updateTaskView.push(tasks[i]);
                }
            }
            setViewTasks(updateTaskView);
        }
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
                        <Task id={item.id} title={item.title} />
                    </div>
                ))}
            </ul>

            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    {'Search:\r'}
                    <input type="text" value={value} onChange={(e) => handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={(e) => handleAddTask(e)}>
                <label>
                    {'Add task title:\r'}
                    <input type="text" value={taskToAdd} onChange={(e) => handleAddTaskChange(e)} />
                </label>
                <input type="submit" value="Add Task" />
            </form>
        </div>
    );
};

export default Category;
