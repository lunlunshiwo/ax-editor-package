import React from 'react';
import { FormControlProps } from './Item';
import { Schema } from '../../types';
import { IComboStore } from '../../store/combo';
export interface ArrayProps extends FormControlProps {
    placeholder?: string;
    controls: Array<Schema>;
    minLength?: number;
    maxLength?: number;
    addButtonClassName?: string;
    items: Schema & {
        unique?: boolean;
    };
    store: IComboStore;
}
export default class ArrayControl extends React.Component<ArrayProps> {
    comboInstance: any;
    constructor(props: ArrayProps);
    comboRef(ref: any): void;
    validate(args: Array<any>): any;
    render(): JSX.Element;
}
export declare class ArrayControlRenderer extends ArrayControl {
}
