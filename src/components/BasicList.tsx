import Category from './Category';
import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BasicList: React.FC = () => {
    const [categories, setCategories] = useState<Task[]>([]);
    const [value, setValue] = useState('');
    const [viewCategories, setViewCategories] = useState<Task[]>(categories);
    const [categoryToAdd, setCategoryToAdd] = useState('');

    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    interface Task {
        id: number;
        title: string;
    }

    const fetchCategoryList = () => {
        axios
            //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
            .get<Task[]>('http://localhost:3000/categories')
            .then((result) => {
                setIsLoaded(true);
                setCategories(result.data);
                setViewCategories(result.data);
            })
            .catch((error) => setError(error));
    };

    useEffect(fetchCategoryList, []);

    function handleChange(event: any) {
        setValue(event.target.value);
    }

    function handleSubmit(event: any) {
        const search: string = value;
        setViewCategories([]);
        const updateTaskView: Task[] = [];
        if (search == '') {
            setViewCategories(categories);
        } else {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].title.toLowerCase().includes(search)) {
                    updateTaskView.push(categories[i]);
                }
            }
            setViewCategories(updateTaskView);
        }
        console.log(updateTaskView);
        event.preventDefault();
    }

    // add task form event handlers

    function addCategoryHandleChange(event: any) {
        setCategoryToAdd(event.target.value);
    }

    function addCategory(event: any) {
        axios
            .post('http://localhost:3000/categories', { title: categoryToAdd })
            .then((result) => {
                console.log('success');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    if (error) {
        return (
            <div>
                {'Error: '}
                {error.message}
            </div>
        );
    } else if (!isLoaded) {
        return <div>{'Loading...'}</div>;
    } else {
        return (
            <div style={{ width: '25vw', margin: 'auto', textAlign: 'center' }}>
                <h4>{'Some web development tools/concepts:'}</h4>
                <ul>
                    {viewCategories.map((item) => (
                        <div key={item.id}>
                            <Category id={item.id} title={item.title} fetchCategoryList={fetchCategoryList} />
                            <br></br>
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

                <form onSubmit={(e) => addCategory(e)}>
                    <label>
                        {'Add Category:\r'}
                        <input type="text" value={categoryToAdd} onChange={(e) => addCategoryHandleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default BasicList;
