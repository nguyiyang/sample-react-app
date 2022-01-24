import Category from './categories/Category';
import Error from './Error';
import { Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BasicList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [viewCategories, setViewCategories] = useState<Category[]>(categories);
    const [categoryToAdd, setCategoryToAdd] = useState('');

    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState(false);

    interface Category {
        id: number;
        title: string;
    }

    interface Error {
        message: string;
    }

    const fetchCategoryList = () => {
        axios
            .get<Category[]>('https://nguyiyang-cvwo.herokuapp.com/categories')
            //.get<Category[]>('http://localhost:3000/categories')
            .then((result) => {
                setIsLoaded(true);
                setCategories(result.data);
                setViewCategories(result.data);
            })
            .catch((error) => setError(error.response.data.message));
        event?.preventDefault;
    };

    useEffect(fetchCategoryList, []);

    // add category form event handlers

    function addCategoryHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCategoryToAdd(event.target.value);
    }

    function addCategory(event: React.SyntheticEvent) {
        axios
            .post('https://nguyiyang-cvwo.herokuapp.com/categories', { title: categoryToAdd })
            //.post('http://localhost:3000/categories', { title: categoryToAdd })
            .then(() => {
                setError('');
                fetchCategoryList();
                setCategoryToAdd('');
            })
            .catch((error) => setError(error.response.data.message));
        event.preventDefault();
    }

    if (!isLoaded) {
        return <div>{'Loading...'}</div>;
    } else {
        return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <form onSubmit={(e) => addCategory(e)}>
                    <label>
                        <input type="text" value={categoryToAdd} onChange={(e) => addCategoryHandleChange(e)} />
                    </label>
                    <input type="submit" value="New Category" />
                </form>
                <Error message={error} setError={setError} />
                <div className="flex-container">
                    {viewCategories.map((item) => (
                        <Paper className="flex-child" elevation={3} key={item.id}>
                            <Category id={item.id} title={item.title} fetchCategoryList={fetchCategoryList} />
                            <br></br>
                        </Paper>
                    ))}
                </div>
            </div>
        );
    }
};

export default BasicList;
