import React, { useState } from 'react';
import axios from 'axios';

interface SearchTaskProps {
    id: number;
    setViewTasks: any;
    tasks: Task[];
}

interface Task {
    id: number;
    title: string;
    priority: string;
    recurrence: string;
}

interface Error {
    message: string;
}

const SearchTask: React.FC<SearchTaskProps> = (props: SearchTaskProps) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<Error>();

    function handleSearch(event: React.SyntheticEvent) {
        const search: string = value;
        props.setViewTasks([]);
        if (search == '') {
            props.setViewTasks(props.tasks);
        } else {
            axios
                //.get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
                .get<Task[]>(`http://localhost:3000/categories/${props.id}/tasks/search/${value}`)
                .then((result) => {
                    props.setViewTasks(result.data);
                    setValue('');
                })
                .catch((error) => setError(error));
        }
        event.preventDefault();
    }

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <label>
                {'Search:\r'}
                <input type="text" value={value} onChange={(e) => handleSearchChange(e)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default SearchTask;
