import React from 'react';
import { OptionsControlProps } from './Options';
import { Action } from '../../types';
import { StateChangeOptions } from 'downshift';
export interface TextProps extends OptionsControlProps {
    placeholder?: string;
    addOn?: Action & {
        position?: 'left' | 'right';
        label?: string;
        icon?: string;
        className?: string;
    };
    clearable: boolean;
    resetValue?: any;
    autoComplete?: any;
    allowInputText?: boolean;
    spinnerClassName: string;
}
export interface TextState {
    isOpen?: boolean;
    inputValue?: string;
    isFocused?: boolean;
}
export default class TextControl extends React.PureComponent<TextProps, TextState> {
    input?: HTMLInputElement;
    highlightedIndex?: any;
    unHook: Function;
    constructor(props: TextProps);
    static defaultProps: Partial<TextProps>;
    componentWillReceiveProps(nextProps: TextProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    inputRef(ref: any): void;
    focus(): void;
    clearValue(): void;
    removeItem(index: number): void;
    handleClick(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    handleChange(value: any): void;
    handleStateChange(changes: StateChangeOptions<any>): void;
    handleNormalInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    loadAutoComplete(): void;
    reload(): void;
    renderSugestMode(): JSX.Element;
    renderNormal(): JSX.Element;
    render(): JSX.Element;
}
export declare function mapItemIndex(items: Array<any>, values: Array<any>, valueField?: string): any;
export declare class TextControlRenderer extends TextControl {
}
export declare class PasswordControlRenderer extends TextControl {
}
export declare class EmailControlRenderer extends TextControl {
}
export declare class UrlControlRenderer extends TextControl {
}
