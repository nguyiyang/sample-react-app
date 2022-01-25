import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteCategoryProps {
    id: number;
    fetchCategoryList: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = (props: DeleteCategoryProps) => {
    function handleDeleteCategory(event: React.SyntheticEvent, id: number) {
        axios.delete(`https://nguyiyang-cvwo.herokuapp.com/categories/${id}`).then(() => {
            props.fetchCategoryList();
        });
        event.preventDefault();
    }

    return (
        <div className="topcorner">
            <DeleteIcon onClick={(e) => handleDeleteCategory(e, props.id)} />
        </div>
    );
};

export default DeleteCategory;
