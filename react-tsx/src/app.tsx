import './app.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloList } from './components/HelloList';
import { Home } from './components/Home';
import { PrimaryBar, Toolbar } from './components/PrimaryBar';

const primaryToolbar: Toolbar = {
    title: 'User Name',
    items: [
        {
            title: 'Profile',
            items: [
                {
                    title: 'Personal',
                },
                {
                    title: 'General',
                    isActive: true,
                },
            ],
        },
        {
            title: 'Logout',
            isActive: true,
        },
    ],
};

ReactDOM.render(
    <div className="wrapper">
        <PrimaryBar toolbar={primaryToolbar} />
        <Home>
            <HelloList
                hellos={[
                    {
                        key: 0,
                        framework: 'React',
                        compiler: 'TypeScript',
                        status: 'rules',
                    },
                    {
                        key: 1,
                        framework: 'React',
                        compiler: 'JavaScript',
                        status: 'nice',
                    },
                    {
                        key: 2,
                        framework: 'Angular 1',
                        compiler: 'anything',
                        status: 'so-so',
                    },
                    {
                        key: 3,
                        framework: 'Angular 2',
                        compiler: 'anything',
                        status: 'sucks',
                    },
                    {
                        key: 4,
                        framework: 'Aurelia',
                        compiler: 'anything',
                        status: 'maybe',
                    },
                    {
                        key: 5,
                        framework: 'Vue',
                        compiler: 'anything',
                        status: 'want to believe',
                    },
                ]}
            />
        </Home>
    </div>,
    document.getElementById('app'),
);
