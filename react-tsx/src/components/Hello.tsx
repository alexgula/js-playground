import './Hello.less';

import * as React from 'react';

import { classNamePrefixer } from '../css';

const css = classNamePrefixer('hello');

export const Hello: React.StatelessComponent<{
    compiler: string;
    framework: string;
    status: string;
}> = props =>
    <li className={css()}>
        {props.framework} on {props.compiler} => {props.status}!
    </li>;
