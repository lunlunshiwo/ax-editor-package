/**
 * @file filter
 * @author fex
 */
import React from 'react';
import { FormControlProps } from './Item';
import { Option } from './Options';
export interface RepeatProps extends FormControlProps {
    options?: string;
    placeholder?: string;
}
export default class RepeatControl extends React.Component<RepeatProps, any> {
    static defaultProps: {
        options: string;
        placeholder: string;
    };
    constructor(props: RepeatProps);
    handleOptionChange(option: Option): void;
    handleChange(value: string): void;
    renderInput(): JSX.Element;
    render(): JSX.Element;
}
export declare class RepeatControlRenderer extends RepeatControl {
}
