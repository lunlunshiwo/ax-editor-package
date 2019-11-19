import React from 'react';
import { IFormItemStore, IFormStore } from '../../store/form';
import { RendererProps, TestFunc, RendererConfig } from '../../factory';
import { FormHorizontal, FormSchema } from '.';
import { Schema } from '../../types';
export interface FormItemBasicConfig extends Partial<RendererConfig> {
    type?: string;
    wrap?: boolean;
    renderLabel?: boolean;
    renderDescription?: boolean;
    test?: RegExp | TestFunc;
    storeType?: string;
    validations?: string;
    strictMode?: boolean;
    descriptionClassName?: string;
    storeExtendsData?: boolean;
    sizeMutable?: boolean;
    weight?: number;
    extendsData?: boolean;
    validate?: (values: any, value: any) => string | boolean;
}
export interface FormItemProps extends RendererProps {
    name?: string;
    formStore?: IFormStore;
    formItem?: IFormItemStore;
    formInited: boolean;
    formMode: 'normal' | 'horizontal' | 'inline' | 'row' | 'default';
    formHorizontal: FormHorizontal;
    defaultSize?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    disabled: boolean;
    btnDisabled: boolean;
    defaultValue: any;
    value: any;
    prinstine: any;
    setPrinstineValue: (value: any) => void;
    onChange: (value: any, submitOnChange?: boolean) => void;
    onBulkChange: (values: {
        [propName: string]: any;
    }, submitOnChange?: boolean) => void;
    addHook: (fn: Function, mode?: 'validate' | 'init') => () => void;
    removeHook: (fn: Function, mode?: 'validate' | 'init') => void;
    renderFormItems: (schema: FormSchema, region: string, props: any) => JSX.Element;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    formItemValue: any;
    getValue: () => any;
    setValue: (value: any, key: string) => void;
    inputClassName?: string;
    renderControl?: (props: FormControlProps) => JSX.Element;
    inputOnly?: boolean;
    renderLabel?: boolean;
    renderDescription?: boolean;
    sizeMutable?: boolean;
    wrap?: boolean;
    hint?: string;
    description?: string;
    descriptionClassName?: string;
    errors?: {
        [propName: string]: string;
    };
    error?: string;
}
export declare type FormControlProps = RendererProps & {
    onOpenDialog: (schema: Schema, data: any) => Promise<any>;
} & Exclude<FormItemProps, 'inputClassName' | 'renderControl' | 'defaultSize' | 'size' | 'error' | 'errors' | 'hint' | 'descriptionClassName' | 'inputOnly' | 'renderLabel' | 'renderDescription' | 'sizeMutable' | 'wrap'>;
export declare type FormItemComponent = React.ComponentType<FormItemProps>;
export declare type FormControlComponent = React.ComponentType<FormControlProps>;
export interface FormItemConfig extends FormItemBasicConfig {
    component: FormControlComponent;
}
export declare class FormItemWrap extends React.Component<FormItemProps> {
    reaction: any;
    componentWillMount(): void;
    componentWillUnmount(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleOpenDialog(schema: Schema, data: any): Promise<{} | undefined>;
    handleDialogConfirm([values]: Array<any>): void;
    handleDialogClose(): void;
    renderControl(): JSX.Element | null;
    renderHorizontal(): JSX.Element;
    renderNormal(): JSX.Element;
    renderInline(): JSX.Element;
    renderRow(): JSX.Element;
    render(): JSX.Element | null;
}
export declare function registerFormItem(config: FormItemConfig): RendererConfig;
export declare function FormItem(config: FormItemBasicConfig): (component: React.ComponentType<FormControlProps>) => any;
export default FormItem;
