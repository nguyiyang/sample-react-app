import React, { useState } from 'react';
import axios from 'axios';

interface DeleteCategoryProps {
    id: number;
    fetchCategoryList: any;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = (props: DeleteCategoryProps) => {
    const [error, setError] = useState<string>('');

    function handleDeleteCategory(event: React.SyntheticEvent, id: number) {
        axios
            .delete(`http://localhost:3000/categories/${id}`)
            .then(() => {
                props.fetchCategoryList();
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    return (
        <form onSubmit={(e) => handleDeleteCategory(e, props.id)}>
            <input type="submit" value="Delete Category" />
        </form>
    );
};

export default DeleteCategory;
