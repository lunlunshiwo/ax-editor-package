import React from 'react';
import { FormControlProps } from './Item';
export interface SubFormProps extends FormControlProps {
    placeholder?: string;
    multiple?: boolean;
    minLength?: number;
    maxLength?: number;
    labelField?: string;
}
export interface SubFormState {
    openedIndex: number;
    optionIndex: number;
}
export default class SubFormControl extends React.PureComponent<SubFormProps, SubFormState> {
    static defaultProps: Partial<SubFormProps>;
    state: SubFormState;
    constructor(props: SubFormProps);
    addItem(): void;
    removeItem(key: number, e: React.UIEvent<any>): void;
    open(index?: number): void;
    close(): void;
    handleDialogConfirm(values: Array<object>): void;
    buildDialogSchema(): {
        type: string;
        body: {
            type: string;
        };
    };
    renderMultipe(): JSX.Element[];
    renderSingle(): JSX.Element;
    render(): JSX.Element;
}
export declare class SubFormControlRenderer extends SubFormControl {
}
