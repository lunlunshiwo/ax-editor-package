import React from 'react';
import { StateChangeOptions } from 'downshift';
import { FormControlProps } from './Item';
export interface Option {
    label?: string;
    value?: any;
}
export interface IconPickerProps extends FormControlProps {
    placeholder?: string;
    resetValue?: any;
    noDataTip?: string;
}
export interface IconPickerState {
    isOpen?: boolean;
    inputValue?: string;
    isFocused?: boolean;
    vendorIndex?: number;
}
export default class IconPickerControl extends React.PureComponent<IconPickerProps, IconPickerState> {
    input?: HTMLInputElement;
    state: IconPickerState;
    static defaultProps: Pick<IconPickerProps, 'resetValue' | 'placeholder' | 'noDataTip'>;
    componentWillReceiveProps(nextProps: IconPickerProps): void;
    changeVendor(index: number): void;
    formatOptions(): {
        label: string;
        value: string;
    }[];
    getVendors(): string[];
    inputRef(ref: any): void;
    focus(): void;
    handleClick(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    handleChange(value: any): void;
    handleStateChange(changes: StateChangeOptions<any>): void;
    renderFontIcons(): JSX.Element;
    render(): JSX.Element;
}
export declare class IconPickerControlRenderer extends IconPickerControl {
}
