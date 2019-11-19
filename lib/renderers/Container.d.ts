import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode } from '../types';
export interface ContainerProps extends RendererProps {
    body?: SchemaNode;
    children?: (props: any) => React.ReactNode;
    className?: string;
}
export default class Container<T> extends React.Component<ContainerProps & T, object> {
    static propsList: Array<string>;
    static defaultProps: {
        className: string;
    };
    renderBody(): JSX.Element | null;
    render(): JSX.Element;
}
export declare class ContainerRenderer extends Container<{}> {
}
