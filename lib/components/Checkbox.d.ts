/**
 * @file Checkbox
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface CheckboxProps {
    id?: string;
    key?: string | number;
    style?: React.CSSProperties;
    type: 'checkbox' | 'radio';
    size?: 'sm' | 'lg' | 'small' | 'large';
    label?: string;
    labelClassName?: string;
    className?: string;
    onChange?: (value: any) => void;
    value?: any;
    containerClass?: string;
    inline?: boolean;
    trueValue?: boolean;
    falseValue?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    name?: string;
    description?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    partial?: boolean;
    data?: any;
}
export declare class Checkbox extends React.Component<CheckboxProps, any> {
    static defaultProps: {
        trueValue: boolean;
        falseValue: boolean;
        type: string;
    };
    handleCheck(e: React.ChangeEvent<any>): void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
