import React from 'react';
import { OptionsControlProps, Option } from '../Form/Options';
export interface NestedSelectProps extends OptionsControlProps {
    cascade?: boolean;
    withChildren?: boolean;
}
export interface NestedSelectState {
    isOpened?: boolean;
}
export default class NestedSelectControl extends React.Component<NestedSelectProps, NestedSelectState> {
    static defaultProps: Partial<NestedSelectProps>;
    target: any;
    alteredOptions: any;
    state: {
        isOpened: boolean;
    };
    domRef(ref: any): void;
    open(): void;
    close(): void;
    renderValue(): JSX.Element;
    renderClear(): JSX.Element | null;
    clearValue(): void;
    handleOptionClick(option: Option, e: React.MouseEvent<HTMLElement>): void;
    handleCheck(option: any | Array<any>): void;
    allChecked(options: Array<any>): boolean;
    partialChecked(options: Array<any>): boolean;
    reload(): void;
    renderOptions(newOptions: Array<any>, isChildren: boolean, uncheckable: boolean): any;
    renderOuter(): JSX.Element;
    render(): JSX.Element;
}
export declare class NestedSelectControlRenderer extends NestedSelectControl {
}
