import * as React from 'react';

export const Icon: React.StatelessComponent<{ type: string }> = props => {
    return <i className={`v-icon v-icon-${props.type}`} />;
};
