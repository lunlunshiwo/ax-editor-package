/**
 * @file Checkboxes
 * @description 多选输入框
 * @author fex
 */
import React from 'react';
import { Option } from './Checkboxes';
import { ClassNamesFn } from '../theme';
export interface Option {
    label?: string;
    value?: any;
    disabled?: boolean;
    children?: Options;
    description?: string;
    [propName: string]: any;
}
export interface Options extends Array<Option> {
}
export interface OptionProps {
    multi?: boolean;
    multiple?: boolean;
    valueField?: string;
    options?: Options;
    joinValues: boolean;
    extractValue: boolean;
    delimiter: string;
    clearable: boolean;
    placeholder?: string;
}
export declare type OptionValue = string | number | null | undefined | Option;
export declare function value2array(value: OptionValue | Array<OptionValue>, props: Partial<OptionProps>): Array<Option>;
export declare function expandValue(value: OptionValue, props: Partial<OptionProps>): Option | null;
/**
 * 参数说明：
 *
 * options: [
 *   {
 *      label: '显示的名字',
 *      value: '值',
 *      disabled: false
 *   }
 * ]
 */
interface CheckboxesProps extends OptionProps {
    id?: string;
    key?: string;
    className?: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: Function;
    inline?: boolean;
    columnsCount?: number;
    checked?: boolean;
    labelClassName?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Checkboxes extends React.PureComponent<CheckboxesProps, any> {
    static defaultProps: {
        joinValues: boolean;
        extractValue: boolean;
        inline: boolean;
        delimiter: string;
        columnsCount: number;
    };
    toggleOption(option: Option): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<CheckboxesProps, "disabled" | "multiple" | "key" | "type" | "id" | "value" | "valueField" | "options" | "className" | "classPrefix" | "classnames" | "checked" | "placeholder" | "onChange" | "labelClassName" | "multi" | "clearable"> & Partial<Pick<CheckboxesProps, "inline" | "delimiter" | "joinValues" | "extractValue" | "columnsCount">> & Partial<Pick<{
    joinValues: boolean;
    extractValue: boolean;
    inline: boolean;
    delimiter: string;
    columnsCount: number;
}, never>>, "disabled" | "inline" | "multiple" | "key" | "type" | "id" | "value" | "delimiter" | "valueField" | "joinValues" | "extractValue" | "options" | "className" | "checked" | "placeholder" | "onChange" | "labelClassName" | "multi" | "clearable" | "columnsCount"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Checkboxes;
};
export default _default;
