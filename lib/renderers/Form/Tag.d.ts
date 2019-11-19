import React from 'react';
import { OptionsControlProps, Option } from './Options';
export interface TagProps extends OptionsControlProps {
    placeholder?: string;
    clearable: boolean;
    resetValue?: any;
    optionsTip: string;
}
export interface TagState {
    inputValue: string;
    isFocused?: boolean;
}
export default class TagControl extends React.PureComponent<TagProps, TagState> {
    input: React.RefObject<HTMLInputElement>;
    constructor(props: TagProps);
    static defaultProps: Partial<TagProps>;
    componentWillReceiveProps(nextProps: TagProps): void;
    focus(): void;
    clearValue(): void;
    removeItem(index: number): void;
    addItem(option: Option): void;
    handleClick(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    getParent(): (Node & ParentNode) | null;
    reload(): void;
    render(): JSX.Element;
}
export declare class TagControlRenderer extends TagControl {
}
