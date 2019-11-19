/**
 * @file Tree
 * @description 树形组件
 * @author fex
 */
import React from 'react';
import { Option, Options } from './Checkboxes';
import { ClassNamesFn } from '../theme';
interface TreeSelectorProps {
    classPrefix: string;
    classnames: ClassNamesFn;
    highlightTxt?: string;
    showIcon?: boolean;
    initiallyOpen?: boolean;
    unfoldedLevel?: number;
    showRadio?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    withChildren?: boolean;
    onlyChildren?: boolean;
    labelField: string;
    valueField: string;
    iconField: string;
    unfoldedField: string;
    foldedField: string;
    disabledField: string;
    className?: string;
    itemClassName?: string;
    joinValues?: boolean;
    extractValue?: boolean;
    delimiter?: string;
    options: Options;
    value: any;
    onChange: Function;
    placeholder?: string;
    hideRoot?: boolean;
    rootLabel?: string;
    rootValue?: any;
    cascade?: boolean;
    selfDisabledAffectChildren?: boolean;
    minLength?: number;
    maxLength?: number;
    bultinCUD?: boolean;
    rootCreatable?: boolean;
    creatable?: boolean;
    onAdd?: (idx?: number | Array<number>, value?: any, skipForm?: boolean) => void;
    editable?: boolean;
    onEdit?: (value: Option, origin?: Option, skipForm?: boolean) => void;
    removable?: boolean;
    onDelete?: (value: Option) => void;
}
interface TreeSelectorState {
    value: Array<any>;
    unfolded: {
        [propName: string]: string;
    };
    inputValue: string;
    addingParent: Option | null;
    isAdding: boolean;
    isEditing: boolean;
    editingItem: Option | null;
}
export declare class TreeSelector extends React.Component<TreeSelectorProps, TreeSelectorState> {
    static defaultProps: {
        showIcon: boolean;
        initiallyOpen: boolean;
        unfoldedLevel: number;
        showRadio: boolean;
        multiple: boolean;
        disabled: boolean;
        withChildren: boolean;
        onlyChildren: boolean;
        labelField: string;
        valueField: string;
        iconField: string;
        unfoldedField: string;
        foldedField: string;
        disabledField: string;
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        hideRoot: boolean;
        rootLabel: string;
        rootValue: number;
        cascade: boolean;
        selfDisabledAffectChildren: boolean;
    };
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: TreeSelectorProps): void;
    syncUnFolded(props: TreeSelectorProps): {
        [propName: string]: string;
    };
    toggleUnfolded(node: any): void;
    clearSelect(): void;
    handleSelect(node: any, value?: any): void;
    handleCheck(item: any, checked: boolean): void;
    handleAdd(parent?: Option | null): void;
    handleEdit(item: Option): void;
    handleRemove(item: Option): void;
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleConfirm(): void;
    handleCancel(): void;
    renderInput(prfix?: JSX.Element | null): JSX.Element;
    renderList(list: Options, value: Option[], uncheckable: boolean): {
        dom: Array<JSX.Element | null>;
        childrenChecked: number;
    };
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<TreeSelectorProps, "value" | "options" | "minLength" | "maxLength" | "className" | "classPrefix" | "classnames" | "placeholder" | "onChange" | "creatable" | "onAdd" | "editable" | "onEdit" | "removable" | "onDelete" | "itemClassName" | "highlightTxt" | "bultinCUD" | "rootCreatable"> & Partial<Pick<TreeSelectorProps, "disabled" | "multiple" | "delimiter" | "valueField" | "labelField" | "joinValues" | "extractValue" | "showIcon" | "initiallyOpen" | "unfoldedLevel" | "showRadio" | "withChildren" | "onlyChildren" | "iconField" | "unfoldedField" | "foldedField" | "disabledField" | "hideRoot" | "rootLabel" | "rootValue" | "cascade" | "selfDisabledAffectChildren">> & Partial<Pick<{
    showIcon: boolean;
    initiallyOpen: boolean;
    unfoldedLevel: number;
    showRadio: boolean;
    multiple: boolean;
    disabled: boolean;
    withChildren: boolean;
    onlyChildren: boolean;
    labelField: string;
    valueField: string;
    iconField: string;
    unfoldedField: string;
    foldedField: string;
    disabledField: string;
    joinValues: boolean;
    extractValue: boolean;
    delimiter: string;
    hideRoot: boolean;
    rootLabel: string;
    rootValue: number;
    cascade: boolean;
    selfDisabledAffectChildren: boolean;
}, never>>, "disabled" | "multiple" | "value" | "delimiter" | "valueField" | "labelField" | "joinValues" | "extractValue" | "options" | "minLength" | "maxLength" | "className" | "placeholder" | "onChange" | "creatable" | "onAdd" | "editable" | "onEdit" | "removable" | "onDelete" | "itemClassName" | "highlightTxt" | "showIcon" | "initiallyOpen" | "unfoldedLevel" | "showRadio" | "withChildren" | "onlyChildren" | "iconField" | "unfoldedField" | "foldedField" | "disabledField" | "hideRoot" | "rootLabel" | "rootValue" | "cascade" | "selfDisabledAffectChildren" | "bultinCUD" | "rootCreatable"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof TreeSelector;
};
export default _default;
