import BasicList from '../components/BasicList';
import React from 'react';

const Home: React.FC = () => {
    return (
        <>
            <h3>{'Welcome to my task manager application! Start by adding some categories and tasks!'}</h3>
            <br />
            <BasicList />
        </>
    );
};

export default Home;
