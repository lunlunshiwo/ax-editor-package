import React from 'react';
import { FormControlProps } from './Item';
import { Schema } from '../../types';
interface HBoxProps extends FormControlProps {
    size?: string;
}
export declare class HBoxRenderer extends React.Component<HBoxProps, any> {
    static propsList: Array<string>;
    static defaultProps: Partial<HBoxProps>;
    renderColumn(column: any, key: number, length: number): JSX.Element | null;
    renderChild(region: string, node: Schema): any;
    render(): JSX.Element;
}
export {};
