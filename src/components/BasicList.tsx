import React, { useState } from 'react';
import '../App.css';

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
                if (tasks[i].includes(search)) {
                    updateTaskView.push(tasks[i]);
                }
            }
            setViewTasks(updateTaskView);
        }
        event.preventDefault();
    }

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
        </div>
    );
};

export default BasicListTwo;
