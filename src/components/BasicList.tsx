import Category from './categories/Category';
import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BasicList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [viewCategories, setViewCategories] = useState<Category[]>(categories);
    const [categoryToAdd, setCategoryToAdd] = useState('');

    const [error, setError] = useState<Error>();
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
            .catch((error) => setError(error));
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
                fetchCategoryList();
                setCategoryToAdd('');
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
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <form onSubmit={(e) => addCategory(e)}>
                    <label>
                        {'Add Category:\r'}
                        <input type="text" value={categoryToAdd} onChange={(e) => addCategoryHandleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div className="flex-container">
                    {viewCategories.map((item) => (
                        <div className="flex-child" key={item.id}>
                            <Category id={item.id} title={item.title} fetchCategoryList={fetchCategoryList} />
                            <br></br>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default BasicList;
