import './HelloList.less';

import * as React from 'react';

import { classNamePrefixer } from '../css';
import { Hello } from './Hello';

export interface HelloItem {
    key: number;
    compiler: string;
    framework: string;
    status: string;
}

export interface HelloListProps {
    hellos: HelloItem[];
}

interface HelloListState {
    hellos: HelloItem[];
    hidden: HelloItem;
}

const css = classNamePrefixer('hello-list');

export class HelloList extends React.Component<HelloListProps, HelloListState> {
    timerID: number;

    constructor(props: HelloListProps) {
        super(props);
        this.state = this.getNewState();
    }

    componentDidMount() {
        this.timerID = window.setInterval(() => this.setState(this.getNewState()), 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timerID);
    }

    getNewState(): HelloListState {
        const i = Math.floor(Math.random() * this.props.hellos.length);
        const hidden = this.props.hellos[i];
        const hellos = this.props.hellos.slice();
        hellos.splice(i, 1);
        console.log(i);
        return { hellos, hidden };
    }

    render() {
        return (
            <ul className={css()}>
                {this.state.hellos.map(({ key, ...props }) => <Hello {...props} key={key} />)}
            </ul>
        );
    }
}
