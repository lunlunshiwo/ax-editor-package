import React from 'react';
import { OptionsControlProps } from './Options';
export interface TreeProps extends OptionsControlProps {
    placeholder?: any;
    hideRoot?: boolean;
    rootLabel?: string;
    rootValue?: any;
    showIcon?: boolean;
    cascade?: boolean;
    withChildren?: boolean;
    onlyChildren?: boolean;
    addControls?: Array<any>;
    updateControls?: Array<any>;
    rootCreatable?: boolean;
}
export default class TreeControl extends React.Component<TreeProps> {
    static defaultProps: Partial<TreeProps>;
    reload(): void;
    render(): JSX.Element;
}
export declare class TreeControlRenderer extends TreeControl {
}
