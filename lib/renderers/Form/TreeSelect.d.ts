import React from 'react';
import { OptionsControlProps, Option } from './Options';
import { Api } from '../../types';
export interface TreeSelectProps extends OptionsControlProps {
    placeholder?: any;
    autoComplete?: Api;
}
export interface TreeSelectState {
    isOpened: boolean;
    isFocused: boolean;
    inputValue: string;
}
export default class TreeSelectControl extends React.Component<TreeSelectProps, TreeSelectState> {
    static defaultProps: {
        placeholder: string;
        optionsPlaceholder: string;
        multiple: boolean;
        clearable: boolean;
        rootLabel: string;
        rootValue: string;
        showIcon: boolean;
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        resetValue: string;
        spinnerClassName: string;
    };
    container: React.RefObject<HTMLDivElement>;
    target: React.RefObject<HTMLDivElement>;
    input: React.RefObject<HTMLInputElement>;
    cache: {
        [propName: string]: any;
    };
    constructor(props: TreeSelectProps);
    componentDidMount(): void;
    open(fn?: () => void): void;
    close(): void;
    handleFocus(): void;
    handleBlur(): void;
    handleClick(): void;
    handleKeyPress(e: React.KeyboardEvent): void;
    validate(): any;
    removeItem(index: number, e?: React.MouseEvent<HTMLElement>): void;
    handleChange(value: any): void;
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleInputKeyDown(event: React.KeyboardEvent): void;
    clearValue(): void;
    filterOptions(options: Array<Option>, keywords: string): Array<Option>;
    loadRemote(input: string): Promise<{
        options: object[];
    }> | undefined;
    mergeOptions(options: Array<object>): object[];
    reload(): void;
    renderValues(): JSX.Element | JSX.Element[] | null;
    renderOuter(): JSX.Element;
    render(): JSX.Element;
}
export declare class TreeSelectControlRenderer extends TreeSelectControl {
}
