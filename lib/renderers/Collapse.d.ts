import React from 'react';
import { RendererProps } from '../factory';
export interface CollapseProps extends RendererProps {
    title?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'base';
    wrapperComponent?: any;
    headingComponent?: any;
    collapsed?: boolean;
    bodyClassName?: string;
    headingClassName?: string;
    children?: JSX.Element | ((props?: any) => JSX.Element);
}
export interface CollapseState {
    collapsed: boolean;
}
export default class Collapse extends React.Component<CollapseProps, CollapseState> {
    static propsList: Array<string>;
    static defaultProps: Partial<CollapseProps>;
    state: {
        collapsed: boolean;
    };
    constructor(props: CollapseProps);
    componentWillReceiveProps(nextProps: CollapseProps): void;
    toggleCollapsed(): void;
    render(): JSX.Element;
}
export declare class CollapseRenderer extends Collapse {
}
