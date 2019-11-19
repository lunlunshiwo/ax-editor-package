import React from 'react';
import { FormControlProps } from './Item';
export interface SwitchProps extends FormControlProps {
    option?: string;
    trueValue?: any;
    falseValue?: any;
}
export default class SwitchControl extends React.Component<SwitchProps, any> {
    static defaultProps: {
        trueValue: boolean;
        falseValue: boolean;
        optionAtLeft: boolean;
    };
    render(): JSX.Element;
}
export declare class SwitchControlRenderer extends SwitchControl {
}
