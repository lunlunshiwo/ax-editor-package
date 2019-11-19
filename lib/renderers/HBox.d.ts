import React from 'react';
import { RendererProps } from '../factory';
import { Schema } from '../types';
export declare type Column = Schema & {
    columnClassName?: string;
};
export interface HBoxProps extends RendererProps {
    columns: Array<Column>;
    className: string;
    itemRender?: (item: any, key: number, length: number, props: any) => JSX.Element;
}
export default class HBox extends React.Component<HBoxProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<HBoxProps>;
    renderChild(region: string, node: Schema): JSX.Element;
    renderColumn(column: Column, key: number, length: number): JSX.Element | null;
    render(): JSX.Element;
}
export declare class HBoxRenderer extends HBox {
}
