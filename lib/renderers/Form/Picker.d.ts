import React from 'react';
import { OptionsControlProps } from './Options';
import { SchemaNode, Action } from '../../types';
export interface PickerProps extends OptionsControlProps {
    modalMode: 'dialog' | 'drawer';
    pickerSchema: object;
    labelField: string;
}
export interface PickerState {
    isOpened: boolean;
    isFocused: boolean;
    schema: SchemaNode;
}
export default class PickerControl extends React.PureComponent<PickerProps, any> {
    static propsList: Array<string>;
    static defaultProps: Partial<PickerProps>;
    state: PickerState;
    input: React.RefObject<HTMLInputElement>;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: PickerProps): void;
    componentDidUpdate(prevProps: PickerProps): void;
    fetchOptions(): void;
    buildSchema(props: PickerProps): {
        type: string;
        pickerMode: boolean;
        syncLocation: boolean;
        api: string | import("../../types").ApiObject | undefined;
        keepItemSelectionOnPageChange: boolean;
        valueField: string | undefined;
        labelField: string;
        checkOnItemClick: boolean;
        bulkActions: any;
    };
    reload(): void;
    open(): void;
    close(): void;
    handleModalConfirm(values: Array<any>, action: Action, ctx: any, components: Array<any>): void;
    handleChange(items: Array<any>): void;
    removeItem(index: number): void;
    handleKeyDown(e: React.KeyboardEvent): void;
    handleFocus(): void;
    handleBlur(): void;
    handleClick(): void;
    clearValue(): void;
    renderValues(): JSX.Element;
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
export declare class PickerControlRenderer extends PickerControl {
}
