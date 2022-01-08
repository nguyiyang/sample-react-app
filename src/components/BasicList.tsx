import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BasicListTwo: React.FC = () => {
    const [tasks, setTasks] = useState([
        'Frontend',
        'Backend',
        'Relational Database',
        'MVC',
        'RESTful APIs',
        'Ruby on Rails',
        'Go',
    ]);
    const [value, setValue] = useState('');
    const [viewTasks, setViewTasks] = useState<string[]>(tasks);

    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Task[]>([]);

    interface Task {
        id: number;
        title: string;
    }

    useEffect(() => {
        axios
            .get<Task[]>('https://nguyiyang-cvwo.herokuapp.com/tasks')
            //.get<Task[]>('http://localhost:3000/tasks')
            .then((result) => {
                console.log('success');
                setIsLoaded(true);
                setItems(result.data);
            })
            .catch((error) => setError(error));
    }, []);

    function handleChange(event: any) {
        setValue(event.target.value);
    }

    function handleSubmit(event: any) {
        const search: string = value;
        setViewTasks([]);
        const updateTaskView: string[] = [];
        if (search == '') {
            setViewTasks(tasks);
        } else {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].toLowerCase().includes(search)) {
                    updateTaskView.push(tasks[i]);
                }
            }
            setViewTasks(updateTaskView);
        }
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
            <div style={{ width: '25vw', margin: 'auto', textAlign: 'center' }}>
                <h4>{'Some web development tools/concepts:'}</h4>
                <ul>
                    {viewTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        {'Search:\r'}
                        <input type="text" value={value} onChange={(e) => handleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default BasicListTwo;
