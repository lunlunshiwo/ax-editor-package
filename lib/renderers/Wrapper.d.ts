import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode } from '../types';
export interface WrapperProps extends RendererProps {
    body?: SchemaNode;
    className?: string;
    children?: JSX.Element | ((props?: any) => JSX.Element);
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'none';
}
export default class Wrapper extends React.Component<WrapperProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<WrapperProps>;
    renderBody(): JSX.Element | null;
    render(): JSX.Element;
}
export declare class WrapperRenderer extends Wrapper {
}
