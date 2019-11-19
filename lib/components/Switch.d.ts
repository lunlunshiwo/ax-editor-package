/**
 * @file Switch
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface SwitchProps {
    id?: string;
    size?: 'md' | 'lg' | 'middle' | 'large';
    level?: 'info' | 'primary' | 'danger';
    className?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    onChange?: (checked: boolean) => void;
    value?: any;
    inline?: boolean;
    trueValue?: any;
    falseValue?: any;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
}
export declare class Switch extends React.PureComponent<SwitchProps, any> {
    static defaultProps: {
        trueValue: boolean;
        falseValue: boolean;
    };
    constructor(props: SwitchProps);
    hanldeCheck(e: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<SwitchProps, "disabled" | "size" | "inline" | "id" | "value" | "className" | "classPrefix" | "classnames" | "level" | "checked" | "readOnly" | "onChange"> & Partial<Pick<SwitchProps, "trueValue" | "falseValue">> & Partial<Pick<{
    trueValue: boolean;
    falseValue: boolean;
}, never>>, "disabled" | "size" | "inline" | "id" | "value" | "className" | "level" | "checked" | "readOnly" | "onChange" | "trueValue" | "falseValue"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Switch;
};
export default _default;
