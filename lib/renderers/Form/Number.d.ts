import React from 'react';
import { FormControlProps } from './Item';
export interface NumberProps extends FormControlProps {
    placeholder?: string;
    max?: number | string;
    min?: number | string;
    step?: number;
    precision?: number;
}
export default class NumberControl extends React.Component<NumberProps, any> {
    static defaultProps: Partial<NumberProps>;
    constructor(props: NumberProps);
    handleChange(inputValue: any): void;
    filterNum(value: number | string | undefined): number | undefined;
    render(): JSX.Element;
}
export declare class NumberControlRenderer extends NumberControl {
    static defaultProps: Partial<FormControlProps>;
}
