import * as React from 'react';

export const Home: React.StatelessComponent<{}> = ({ children }) => {
    const now = new Date();
    return (
        <div>
            <h1>Hello there, here are the facts:</h1>
            {children}
            <h5>
                Current time is {now.toString()}
            </h5>
        </div>
    );
};
