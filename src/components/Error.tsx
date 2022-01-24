import React from 'react';
import Alert from '@mui/material/Alert';

interface Error {
    message: string;
    setError: (value: string) => void;
}

const Error: React.FC<Error> = (props: Error) => {
    return (
        <div>
            {props.message != '' ? (
                <Alert
                    onClose={() => {
                        props.setError('');
                    }}
                    severity="error"
                >
                    {props.message}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Error;
