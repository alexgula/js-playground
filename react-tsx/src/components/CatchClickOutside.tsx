import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface CatchClickOutsideProps {
    onClick?: (event: Event) => void;
}

export class CatchClickOutside extends React.Component<CatchClickOutsideProps, undefined> {
    componentWillMount() {
        document.body.addEventListener('click', this.handleClick);
        document.body.addEventListener('touchstart', this.handleClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('touchstart', this.handleClick);
        document.body.removeEventListener('click', this.handleClick);
    }

    handleClick = (event: Event) => {
        if (typeof this.props.onClick !== 'function') {
            return;
        }

        const domNode = ReactDOM.findDOMNode(this);

        // if target is container - container was not clicked outside
        // if container contains clicked target - click was not outside of it
        if (!(event.target === domNode || domNode.contains(event.target as Element))) {
            this.props.onClick(event);
        }
    };

    render() {
        return React.Children.only(this.props.children);
    }
}
