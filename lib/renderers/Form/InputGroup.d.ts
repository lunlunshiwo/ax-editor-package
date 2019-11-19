import React from 'react';
import { FormControlProps } from './Item';
export interface InputGroupProps extends FormControlProps {
    controls: Array<any>;
    size?: 'xs' | 'sm' | 'normal';
}
interface InputGroupState {
    isFocused: boolean;
}
export declare class InputGroup extends React.Component<InputGroupProps, InputGroupState> {
    constructor(props: InputGroupProps);
    handleFocus(): void;
    handleBlur(): void;
    renderControl(control: any, index: any, otherProps?: any): JSX.Element | null;
    validate(): string[] | "";
    render(): JSX.Element;
}
export default class InputGroupRenderer extends InputGroup {
}
export {};
