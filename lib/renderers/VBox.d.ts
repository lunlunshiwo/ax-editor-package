import React from 'react';
import { RendererProps } from '../factory';
import { Schema } from '../types';
export declare type Row = Schema & {
    rowClassName?: string;
    cellClassName?: string;
};
export interface HBoxProps extends RendererProps {
    rows?: Array<Row>;
    className?: string;
}
export default class VBox extends React.Component<HBoxProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<HBoxProps>;
    renderChild(region: string, node: Schema): JSX.Element;
    renderCell(row: Row, key: any): JSX.Element;
    render(): JSX.Element;
}
export declare class VBoxRenderer extends VBox {
}
