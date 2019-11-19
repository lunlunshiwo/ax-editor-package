import React from 'react';
import { FormControlProps } from './Item';
export interface CheckboxProps extends FormControlProps {
    option?: string;
    trueValue?: any;
    falseValue?: any;
}
export default class CheckboxControl extends React.Component<CheckboxProps, any> {
    static defaultProps: Partial<CheckboxProps>;
    render(): JSX.Element;
}
export declare class CheckboxControlRenderer extends CheckboxControl {
}
