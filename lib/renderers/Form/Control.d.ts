import React from 'react';
import { IFormStore, IFormItemStore } from '../../store/form';
import { RendererProps } from '../../factory';
import { Schema } from '../../types';
import { IIRendererStore } from '../../store';
import { IScopedContext } from '../../Scoped';
export interface ControlProps extends RendererProps {
    control: {
        id?: string;
        name?: string;
        value?: any;
        required?: boolean;
        validations: string | {
            [propsName: string]: any;
        };
        validationErrors: {
            [propsName: string]: any;
        };
        validateOnChange: boolean;
        multiple?: boolean;
        delimiter?: string;
        joinValues?: boolean;
        extractValue?: boolean;
        valueField?: string;
        labelField?: string;
        unique?: boolean;
        pipeIn?: (value: any, data: any) => any;
        pipeOut?: (value: any, originValue: any, data: any) => any;
        validate?: (value: any, values: any) => any;
    } & Schema;
    formStore: IFormStore;
    store: IIRendererStore;
    addHook: (fn: () => any) => void;
    removeHook: (fn: () => any) => void;
}
export default class FormControl extends React.Component<ControlProps> {
    model: IFormItemStore | undefined;
    control: any;
    hook?: () => any;
    hook2?: () => any;
    static defaultProps: Partial<ControlProps>;
    lazyValidate: Function;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ControlProps): void;
    componentDidUpdate(prevProps: ControlProps): void;
    componentWillUnmount(): void;
    disposeModel(): void;
    controlRef(control: any): void;
    validate(): void;
    handleChange(value: any, submitOnChange?: boolean): void;
    handleBlur(e: any): void;
    handleBulkChange(values: any, submitOnChange?: boolean): void;
    setPrinstineValue(value: any): void;
    getValue(): any;
    setValue(value: any, key?: string): void;
    render(): JSX.Element;
}
export declare class FormControlRenderer extends FormControl {
    static displayName: string;
    static contextType: React.Context<IScopedContext>;
    controlRef(ref: any): void;
}
