/**
 * @file filter
 * @author fex
 */
import React from 'react';
import { FormControlProps } from './Item';
export interface Column {
    label: string;
    [propName: string]: any;
}
export interface Row {
    label: string;
    [propName: string]: any;
}
export interface ValueItem extends Column, Row {
    checked: boolean;
}
export interface MatrixProps extends FormControlProps {
    columns: Array<Column>;
    rows: Array<Row>;
    multiple: boolean;
}
export interface MatrixState {
    columns: Array<Column>;
    rows: Array<Row>;
    loading: boolean;
    error?: string;
    singleSelectMode?: 'cell' | 'row' | 'column';
}
export default class MatrixCheckbox extends React.Component<MatrixProps, MatrixState> {
    static defaultProps: Partial<MatrixProps>;
    state: MatrixState;
    sourceInvalid: boolean;
    mounted: boolean;
    constructor(props: MatrixProps);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: MatrixProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    initOptions(data: any): Promise<void>;
    reload(): Promise<{} | undefined>;
    toggleItem(checked: boolean, x: number, y: number): void;
    renderInput(): JSX.Element;
    render(): JSX.Element;
}
export declare class MatrixRenderer extends MatrixCheckbox {
}
