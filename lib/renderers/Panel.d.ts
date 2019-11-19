import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
export interface PanelProps extends RendererProps {
    title?: string;
    header?: SchemaNode;
    body?: SchemaNode;
    footer?: SchemaNode;
    actions?: Action[];
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    actionsClassName?: string;
    bodyClassName?: string;
    children?: React.ReactNode | ((props: any) => JSX.Element);
    affixFooter?: boolean | 'always';
}
export default class Panel extends React.Component<PanelProps> {
    static propsList: Array<string>;
    static defaultProps: {};
    parentNode?: any;
    unSensor: Function;
    affixDom: React.RefObject<HTMLDivElement>;
    footerDom: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    affixDetect(): void;
    renderBody(): JSX.Element | null;
    renderActions(): JSX.Element[] | null;
    render(): JSX.Element;
}
export declare class PanelRenderer extends Panel {
}
