import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface SortCategoryProps {
    id: number;
    setViewTasks: any;
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

const SortCategory: React.FC<SortCategoryProps> = (props: SortCategoryProps) => {
    const [sortValue, setSortValue] = useState('priority');
    const [error, setError] = useState<string>('');

    function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
        setSortValue(event.target.value);
    }

    function handleSort(event: React.SyntheticEvent) {
        axios
            .get<Task[]>(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.id}/tasks/sort/${sortValue}`)
            //.get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks/sort/${sortValue}`)
            .then((result) => {
                props.setViewTasks(result.data);
            })
            .catch((error) => setError(error));
        event.preventDefault();
    }

    return (
        <div className="filter-child">
            <form onSubmit={(e) => handleSort(e)}>
                <label>
                    <select value={sortValue} onChange={(e) => handleSortChange(e)}>
                        <option value="priority">{'priority\r'}</option>
                        <option value="recurrence">{'recurrence\r'}</option>
                    </select>
                </label>
                <input type="submit" value="Sort" />
            </form>
        </div>
    );
};

export default SortCategory;
