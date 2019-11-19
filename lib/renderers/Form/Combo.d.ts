import React from 'react';
import { FormControlProps } from './Item';
import { Schema, Action, Api } from '../../types';
import { IComboStore } from '../../store/combo';
import Sortable = require('sortablejs');
export interface Condition {
    test: string;
    controls: Array<Schema>;
    label: string;
    scaffold?: any;
    mode?: string;
}
export interface ComboProps extends FormControlProps {
    placeholder?: string;
    flat?: boolean;
    draggable?: boolean;
    controls?: Array<Schema>;
    conditions?: Array<Condition>;
    multiple?: boolean;
    multiLine?: boolean;
    minLength?: number;
    maxLength?: number;
    scaffold?: any;
    addButtonClassName?: string;
    formClassName?: string;
    addButtonText?: string;
    addable?: boolean;
    typeSwitchable?: boolean;
    removable?: boolean;
    deleteApi?: Api;
    deleteConfirmText?: string;
    canAccessSuperData?: boolean;
    subFormMode?: 'normal' | 'inline' | 'horizontal';
    noBorder?: boolean;
    joinValues?: boolean;
    delimiter?: string;
    dragIcon: string;
    deleteIcon: string;
    store: IComboStore;
    tabsMode: boolean;
    tabsStyle: '' | 'line' | 'card' | 'radio';
    tabsLabelTpl?: string;
    messages?: {
        validateFailed?: string;
        minLengthValidateFailed?: string;
        maxLengthValidateFailed?: string;
    };
}
export default class ComboControl extends React.Component<ComboProps> {
    static defaultProps: {
        minLength: number;
        maxLength: number;
        multiple: boolean;
        multiLine: boolean;
        addButtonClassName: string;
        formClassName: string;
        subFormMode: string;
        draggableTip: string;
        addButtonText: string;
        canAccessSuperData: boolean;
        addIcon: string;
        dragIcon: string;
        deleteIcon: string;
        tabsMode: boolean;
        tabsStyle: string;
    };
    static propsList: Array<string>;
    subForms: Array<any>;
    keys: Array<string>;
    dragTip?: HTMLElement;
    sortable?: Sortable;
    defaultValue?: any;
    constructor(props: ComboProps);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: ComboProps): void;
    componentWillUnmount(): void;
    getValueAsArray(props?: Readonly<ComboProps> & Readonly<{
        children?: React.ReactNode;
    }>): any;
    addItemWith(condition: Condition): void;
    addItem(): void;
    removeItem(key: number): Promise<void>;
    handleChange(index: number, values: any): void;
    handleSingleFormChange(values: object): void;
    handleFormInit(index: number, values: any): void;
    handleSingleFormInit(values: any): void;
    handleAction(action: Action): any;
    validate(): any;
    dragTipRef(ref: any): void;
    initDragging(): void;
    destroyDragging(): void;
    formRef(ref: any, index?: number): void;
    formatValue(value: any, index: number): object;
    pickCondition(value: any): Condition | null;
    handleComboTypeChange(index: number, selection: any): void;
    handleTabSelect(key: number): void;
    renderPlaceholder(): JSX.Element;
    renderTabsMode(): JSX.Element;
    renderMultipe(): JSX.Element;
    renderSingle(): JSX.Element;
    render(): JSX.Element;
}
export declare class ComboControlRenderer extends ComboControl {
}
