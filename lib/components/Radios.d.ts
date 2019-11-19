/**
 * @file Radios
 * @description
 * @author fex
 *
 * @param 参数说明：
 * options: [
 *   {
 *      label: '显示的名字',
 *      value: '值',
 *      disabled: false
 *   }
 * ]
 */
import React from 'react';
import { OptionProps, Option } from './Checkboxes';
import { ClassNamesFn } from '../theme';
interface RadioProps extends OptionProps {
    id?: string;
    type: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    inline?: boolean;
    disabled?: boolean;
    onChange?: Function;
    columnsCount: number;
    itemClassName?: string;
    labelClassName?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Radios extends React.Component<RadioProps, any> {
    static defaultProps: {
        joinValues: boolean;
        clearable: boolean;
        columnsCount: number;
    };
    toggleOption(option: Option): void;
    renderGroup(option: Option, index: number, valueArray: Array<Option>): JSX.Element;
    renderItem(option: Option, index: number, valueArray: Array<Option>): JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<RadioProps, "disabled" | "style" | "inline" | "multiple" | "type" | "id" | "value" | "delimiter" | "valueField" | "extractValue" | "options" | "className" | "classPrefix" | "classnames" | "placeholder" | "onChange" | "labelClassName" | "multi" | "itemClassName"> & Partial<Pick<RadioProps, "joinValues" | "clearable" | "columnsCount">> & Partial<Pick<{
    joinValues: boolean;
    clearable: boolean;
    columnsCount: number;
}, never>>, "disabled" | "style" | "inline" | "multiple" | "type" | "id" | "value" | "delimiter" | "valueField" | "joinValues" | "extractValue" | "options" | "className" | "placeholder" | "onChange" | "labelClassName" | "multi" | "clearable" | "columnsCount" | "itemClassName"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Radios;
};
export default _default;
