import React from 'react';
import { RendererProps } from '../factory';
import { Schema } from '../types';
export declare const ColProps: string[];
export declare type Column = Schema & {
    xs?: number;
    xsHidden?: boolean;
    xsOffset?: number;
    xsPull?: number;
    xsPush?: number;
    sm?: number;
    smHidden?: boolean;
    smOffset?: number;
    smPull?: number;
    smPush?: number;
    md?: number;
    mdHidden?: boolean;
    mdOffset?: number;
    mdPull?: number;
    mdPush?: number;
    lg?: number;
    lgHidden?: boolean;
    lgOffset?: number;
    lgPull?: number;
    lgPush?: number;
    mode?: string;
    horizontal?: any;
};
export declare type ColumnNode = Column | ColumnArray;
export interface ColumnArray extends Array<ColumnNode> {
}
export interface GridProps extends RendererProps {
    columns: Array<Column>;
    itemRender?: (item: any, key: number, length: number, props: any) => JSX.Element;
}
export default class Grid<T> extends React.Component<GridProps & T, object> {
    static propsList: Array<string>;
    static defaultProps: {};
    renderChild(region: string, node: Schema, key: number, length: number): JSX.Element;
    renderColumn(column: ColumnNode, key: number, length: number): JSX.Element;
    renderColumns(columns: ColumnArray): React.ReactElement<any> | null;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
}
export declare class GridRenderer extends Grid<{}> {
}
