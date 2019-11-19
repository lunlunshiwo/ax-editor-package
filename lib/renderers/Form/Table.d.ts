import React from 'react';
import { FormControlProps } from './Item';
import { RendererData, Action, Api } from '../../types';
export interface TableProps extends FormControlProps {
    placeholder?: string;
    columns?: Array<any>;
    addable?: boolean;
    addApi?: Api;
    addBtnLabel?: string;
    addBtnIcon?: string;
    showAddBtn?: boolean;
    removable?: boolean;
    deleteApi?: Api;
    editable?: boolean;
    updateBtnLabel?: string;
    updateBtnIcon?: string;
    confirmBtnLabel?: string;
    confirmBtnIcon?: string;
    cancelBtnLabel?: string;
    cancelBtnIcon?: string;
    deleteBtnLabel?: string;
    deleteBtnIcon?: string;
    updateApi?: Api;
    scaffold?: any;
    deleteConfirmText?: string;
    valueField?: string;
}
export interface TableState {
    columns: Array<any>;
    editIndex: number;
    editting?: any;
    isCreateMode?: boolean;
}
export default class FormTable extends React.Component<TableProps, TableState> {
    static defaultProps: {
        placeholder: string;
        scaffold: {};
        addBtnIcon: string;
        updateBtnIcon: string;
        deleteBtnIcon: string;
        confirmBtnIcon: string;
        cancelBtnIcon: string;
        valueField: string;
    };
    static propsList: Array<string>;
    entries: Map<any, number>;
    entityId: number;
    subForms: any;
    constructor(props: TableProps);
    componentWillUnmount(): void;
    subFormRef(form: any, x: number, y: number): void;
    validate(): any;
    doAction(action: Action, ctx: RendererData, ...rest: Array<any>): any;
    addItem(index: number, payload?: any): void;
    startEdit(index: number, editting?: any, isCreate?: boolean): void;
    confirmEdit(): Promise<void>;
    cancelEdit(): void;
    removeItem(index: number): Promise<void>;
    buildItemProps(item: any, index: number): {
        quickEditEnabled: boolean;
    } | null;
    buildColumns(props: TableProps, isCreateMode?: boolean): Array<any>;
    handleTableSave(rows: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<number> | number): void;
    handleSaveTableOrder(moved: Array<object>, rows: Array<object>): void;
    removeEntry(entry: any): void;
    getEntryId(entry: any): string;
    render(): JSX.Element;
}
export declare class TableControlRenderer extends FormTable {
}
