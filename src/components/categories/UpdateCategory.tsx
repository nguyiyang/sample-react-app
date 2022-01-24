import React, { useState, ChangeEvent } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

interface SortCategoryProps {
    id: number;
    title: string;
    fetchCategoryList: () => void;
}

const UpdateCategory: React.FC<SortCategoryProps> = (props: SortCategoryProps) => {
    const [categoryToUpdate, setCategoryToUpdate] = useState('');
    const [error, setError] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateCategory(event: React.SyntheticEvent) {
        axios
            .put(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.id}`, { title: `${categoryToUpdate}` })
            //.put(`http://localhost:3000/categories/${props.id}`, { title: `${categoryToUpdate}` })
            .then(() => {
                props.fetchCategoryList();
                setCategoryToUpdate('');
                setIsEditing(false);
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    function handleUpdateChange(event: ChangeEvent<HTMLInputElement>) {
        setCategoryToUpdate(event.target.value);
    }

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleClickAway = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {isEditing ? (
                        <h1>
                            <form id="update" onSubmit={(e) => handleUpdateCategory(e)}>
                                <input placeholder={'Rename task..: \r'} onChange={(e) => handleUpdateChange(e)} />
                            </form>
                        </h1>
                    ) : (
                        <h1 onClick={handleClick}>{props.title} </h1>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default UpdateCategory;
