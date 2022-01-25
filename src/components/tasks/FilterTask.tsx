import SearchTask from './SearchTask';
import SortCategory from '../categories/SortCategory';
import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';

interface FilterTaskProps {
    id: number;
    setViewTasks: (tasks: Task[]) => void;
    tasks: Task[];
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

const FilterTask: React.FC<FilterTaskProps> = (props: FilterTaskProps) => {
    const [result, setResult] = useState('');
    const searchTaskProps = {
        id: props.id,
        setViewTasks: props.setViewTasks,
        tasks: props.tasks,
        setResult: setResult,
    };

    return (
        <div>
            <div className="filter-container">
                <div className="filter-child">
                    <SortIcon />
                </div>

                <SearchTask {...searchTaskProps} />

                <SortCategory id={props.id} setViewTasks={props.setViewTasks} />
            </div>
            {result == '' ? <></> : <p>{`Showing results for ${result}`}</p>}
        </div>
    );
};

export default FilterTask;
