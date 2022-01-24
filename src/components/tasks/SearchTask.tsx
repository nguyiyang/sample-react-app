import React, { useState } from 'react';
import axios from 'axios';

interface SearchTaskProps {
    id: number;
    setViewTasks: (tasks: Task[]) => void;
    tasks: Task[];
    setResult: (value: string) => void;
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

const SearchTask: React.FC<SearchTaskProps> = (props: SearchTaskProps) => {
    const [value, setValue] = useState('');

    function handleSearch(event: React.SyntheticEvent) {
        const search: string = value;
        props.setViewTasks([]);
        if (search == '') {
            props.setViewTasks(props.tasks);
            props.setResult('');
        } else {
            axios
                .get<Task[]>(`https://nguyiyang-cvwo.herokuapp.com/categories/${props.id}/tasks/search/${value}`)
                //.get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks/search/${value}`)
                .then((result) => {
                    console.log(result.data);
                    props.setViewTasks(result.data);
                    props.setResult(search);
                    setValue('');
                });
        }
        event.preventDefault();
    }

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <div className="filter-child">
            <form onSubmit={(e) => handleSearch(e)}>
                <label>
                    <input type="text" size={10} value={value} onChange={(e) => handleSearchChange(e)} />
                </label>
                <input type="submit" value="Search" />
            </form>
        </div>
    );
};

export default SearchTask;
