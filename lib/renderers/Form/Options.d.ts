/**
 * @file 所有列表选择类控件的父级，比如 Select、Radios、Checkboxes、
 * List、ButtonGroup 等等
 */
import { Api } from '../../types';
import { FormControlProps, FormItemBasicConfig } from './Item';
export declare type OptionsControlComponent = React.ComponentType<FormControlProps>;
import React from 'react';
import { Option, OptionProps } from '../../components/Select';
export { Option };
export interface OptionsBasicConfig extends FormItemBasicConfig {
    autoLoadOptionsFromSource?: boolean;
}
export interface OptionsConfig extends OptionsBasicConfig {
    component: React.ComponentType<OptionsControlProps>;
}
export interface OptionsControlProps extends FormControlProps, OptionProps {
    source?: Api;
    name?: string;
    onToggle: (option: Option, submitOnChange?: boolean) => void;
    onToggleAll: () => void;
    selectedOptions: Array<Option>;
    setOptions: (value: Array<any>) => void;
    setLoading: (value: boolean) => void;
    reloadOptions: () => void;
    creatable?: boolean;
    onAdd?: (idx?: number | Array<number>, value?: any, skipForm?: boolean) => void;
    addControls?: Array<any>;
    editable?: boolean;
    editControls?: Array<any>;
    onEdit?: (value: Option, origin?: Option, skipForm?: boolean) => void;
    removable?: boolean;
    onDelete?: (value: Option) => void;
}
export interface OptionsProps extends FormControlProps, OptionProps {
    source?: Api;
    creatable?: boolean;
    addApi?: Api;
    addControls?: Array<any>;
    editApi?: Api;
    editControls?: Array<any>;
    deleteApi?: Api;
    deleteConfirmText?: string;
    optionLabel?: string;
}
export declare function registerOptionsControl(config: OptionsConfig): import("../../factory").RendererConfig;
export declare function OptionsControl(config: OptionsBasicConfig): <T extends React.ComponentType<OptionsControlProps>>(component: T) => T;
export declare function highlight(text: string, input?: string, hlClassName?: string): string | any[];
