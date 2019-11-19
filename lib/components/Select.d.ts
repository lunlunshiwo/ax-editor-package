/**
 * @file Select
 * @description
 * @author fex
 * @date 2017-11-07
 */
import React from 'react';
import 'react-datetime/css/react-datetime.css';
import { ControllerStateAndHelpers } from 'downshift';
import { ClassNamesFn } from '../theme';
export interface Option {
    label?: string;
    value?: any;
    disabled?: boolean;
    children?: Options;
    visible?: boolean;
    hidden?: boolean;
    description?: string;
    [propName: string]: any;
}
export interface Options extends Array<Option> {
}
export interface OptionProps {
    multi?: boolean;
    multiple?: boolean;
    valueField?: string;
    options: Options;
    joinValues?: boolean;
    extractValue?: boolean;
    delimiter?: string;
    clearable?: boolean;
    placeholder?: string;
    autoFill?: {
        [propName: string]: any;
    };
    creatable?: boolean;
    onAdd?: (idx?: number | Array<number>, value?: any, skipForm?: boolean) => void;
    addControls?: Array<any>;
    editable?: boolean;
    editControls?: Array<any>;
    onEdit?: (value: Option, origin?: Option, skipForm?: boolean) => void;
    removable?: boolean;
    onDelete?: (value: Option) => void;
}
export declare type OptionValue = string | number | null | undefined | Option;
export declare function value2array(value: OptionValue | Array<OptionValue>, props: Partial<OptionProps>): Array<Option>;
export declare function expandValue(value: OptionValue, props: Partial<OptionProps>): Option | null;
export declare function normalizeOptions(options: string | {
    [propName: string]: string;
} | Array<string> | Options): Options;
interface SelectProps extends OptionProps {
    classPrefix: string;
    classnames: ClassNamesFn;
    className?: string;
    creatable: boolean;
    createBtnLabel: string;
    multiple: boolean;
    valueField: string;
    labelField: string;
    searchable?: boolean;
    options: Array<Option>;
    value: any;
    loadOptions?: Function;
    searchPromptText: string;
    loading?: boolean;
    loadingPlaceholder: string;
    spinnerClassName?: string;
    noResultsText: string;
    clearable: boolean;
    clearAllText: string;
    clearValueText: string;
    placeholder: string;
    inline: boolean;
    disabled: boolean;
    popOverContainer?: any;
    onChange: (value: void | string | Option | Array<Option>) => void;
    onFocus?: Function;
    onBlur?: Function;
    checkAll?: boolean;
    checkAllLabel?: string;
    defaultCheckAll?: boolean;
    simpleValue?: boolean;
}
interface SelectState {
    isOpen: boolean;
    isFocused: boolean;
    inputValue: string;
    highlightedIndex: number;
    selection: Array<Option>;
}
export declare class Select extends React.Component<SelectProps, SelectState> {
    static defaultProps: {
        multiple: boolean;
        clearable: boolean;
        creatable: boolean;
        createBtnLabel: string;
        searchPromptText: string;
        loadingPlaceholder: string;
        noResultsText: string;
        clearAllText: string;
        clearValueText: string;
        placeholder: string;
        valueField: string;
        labelField: string;
        spinnerClassName: string;
        inline: boolean;
        disabled: boolean;
        checkAll: boolean;
        checkAllLabel: string;
        defaultCheckAll: boolean;
    };
    input: HTMLInputElement;
    target: HTMLElement;
    menu: React.RefObject<HTMLDivElement>;
    constructor(props: SelectProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SelectProps): void;
    open(): void;
    close(): void;
    toggle(e?: React.MouseEvent<HTMLDivElement>): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    focus(): void;
    blur(): void;
    getTarget(): HTMLElement;
    inputRef(ref: HTMLInputElement): void;
    toggleCheckAll(): void;
    removeItem(index: number, e?: React.MouseEvent<HTMLElement>): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleChange(selectItem: any): void;
    handleStateChange(changes: any): void;
    handleKeyPress(e: React.KeyboardEvent): void;
    clearValue(e: React.MouseEvent<any>): void;
    handleAddClick(): void;
    handleEditClick(e: Event, item: any): void;
    handleDeleteClick(e: Event, item: any): void;
    renderValue({ inputValue, isOpen }: ControllerStateAndHelpers<any>): JSX.Element | JSX.Element[];
    renderOuter({ selectedItem, getItemProps, highlightedIndex, inputValue, isOpen }: ControllerStateAndHelpers<any>, getInputProps: any): JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<SelectProps, "loading" | "value" | "delimiter" | "joinValues" | "extractValue" | "options" | "searchable" | "className" | "classPrefix" | "classnames" | "onFocus" | "onBlur" | "onChange" | "multi" | "popOverContainer" | "loadOptions" | "simpleValue" | "autoFill" | "onAdd" | "addControls" | "editable" | "editControls" | "onEdit" | "removable" | "onDelete"> & Partial<Pick<SelectProps, "disabled" | "inline" | "multiple" | "valueField" | "labelField" | "placeholder" | "clearable" | "creatable" | "createBtnLabel" | "searchPromptText" | "loadingPlaceholder" | "spinnerClassName" | "noResultsText" | "clearAllText" | "clearValueText" | "checkAll" | "checkAllLabel" | "defaultCheckAll">> & Partial<Pick<{
    multiple: boolean;
    clearable: boolean;
    creatable: boolean;
    createBtnLabel: string;
    searchPromptText: string;
    loadingPlaceholder: string;
    noResultsText: string;
    clearAllText: string;
    clearValueText: string;
    placeholder: string;
    valueField: string;
    labelField: string;
    spinnerClassName: string;
    inline: boolean;
    disabled: boolean;
    checkAll: boolean;
    checkAllLabel: string;
    defaultCheckAll: boolean;
}, never>>, "disabled" | "loading" | "inline" | "multiple" | "value" | "delimiter" | "valueField" | "labelField" | "joinValues" | "extractValue" | "options" | "searchable" | "className" | "placeholder" | "onFocus" | "onBlur" | "onChange" | "multi" | "clearable" | "popOverContainer" | "creatable" | "createBtnLabel" | "loadOptions" | "searchPromptText" | "loadingPlaceholder" | "spinnerClassName" | "noResultsText" | "clearAllText" | "clearValueText" | "checkAll" | "checkAllLabel" | "defaultCheckAll" | "simpleValue" | "autoFill" | "onAdd" | "addControls" | "editable" | "editControls" | "onEdit" | "removable" | "onDelete"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Select;
};
export default _default;
