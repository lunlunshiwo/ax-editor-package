/**
 * @file ColorPicker
 * @description 颜色选择器组件
 * @author fex
 */
import React from 'react';
import { ColorResult } from 'react-color';
import { ClassNamesFn } from '../theme';
export interface ColorProps {
    placeholder?: string;
    format: string;
    clearable: boolean;
    className?: string;
    disabled?: boolean;
    popOverContainer?: any;
    placement?: string;
    value: any;
    classPrefix: string;
    classnames: ClassNamesFn;
    onChange: (value: any) => void;
    presetColors?: string[];
}
export interface ColorControlState {
    isOpened: boolean;
    isFocused: boolean;
    inputValue: string;
}
export declare class ColorControl extends React.PureComponent<ColorProps, ColorControlState> {
    static defaultProps: {
        format: string;
        clearable: boolean;
        placeholder: string;
    };
    state: {
        isOpened: boolean;
        isFocused: boolean;
        inputValue: any;
    };
    popover: any;
    closeTimer: number;
    preview: React.RefObject<HTMLElement>;
    input: React.RefObject<HTMLInputElement>;
    constructor(props: ColorProps);
    componentWillReceiveProps(nextProps: ColorProps): void;
    handleFocus(): void;
    handleBlur(): void;
    focus(): void;
    blur(): void;
    open(fn?: () => void): void;
    close(): void;
    clearValue(): void;
    handleClick(): void;
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleChange(color: ColorResult): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<ColorProps, "disabled" | "value" | "className" | "placement" | "classPrefix" | "classnames" | "onChange" | "popOverContainer" | "presetColors"> & Partial<Pick<ColorProps, "placeholder" | "clearable" | "format">> & Partial<Pick<{
    format: string;
    clearable: boolean;
    placeholder: string;
}, never>>, "disabled" | "value" | "className" | "placement" | "placeholder" | "onChange" | "clearable" | "format" | "popOverContainer" | "presetColors"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof ColorControl;
};
export default _default;
