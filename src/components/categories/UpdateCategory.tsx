import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface SortCategoryProps {
    id: number;
    fetchCategoryList: any;
}

const UpdateCategory: React.FC<SortCategoryProps> = (props: SortCategoryProps) => {
    const [categoryToUpdate, setCategoryToUpdate] = useState('');
    const [error, setError] = useState<string>('');

    function handleUpdateCategory(event: React.SyntheticEvent) {
        axios
            .put(`http://localhost:3000/categories/${props.id}`, { title: `${categoryToUpdate}` })
            .then(() => {
                props.fetchCategoryList();
                setCategoryToUpdate('');
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateChange(event: ChangeEvent<HTMLInputElement>) {
        setCategoryToUpdate(event.target.value);
    }

    return (
        <form onSubmit={(e) => handleUpdateCategory(e)}>
            <label>
                {'Update category title:\r'}
                <input type="text" value={categoryToUpdate} onChange={(e) => handleUpdateChange(e)} />
            </label>
            <input type="submit" value="Update Category" />
        </form>
    );
};

export default UpdateCategory;
