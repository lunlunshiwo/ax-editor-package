import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode, Action, Api } from '../types';
import { ITableStore, IColumn, IRow } from '../store/table';
import Sortable = require('sortablejs');
export interface Column {
    type: string;
    [propName: string]: any;
}
export interface TableProps extends RendererProps {
    title?: string;
    header?: SchemaNode;
    footer?: SchemaNode;
    actions?: Action[];
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    store: ITableStore;
    columns?: Array<Column>;
    tableClassName?: string;
    source?: string;
    selectable?: boolean;
    selected?: Array<any>;
    valueField?: string;
    draggable?: boolean;
    columnsTogglable?: boolean | 'auto';
    affixHeader?: boolean;
    combineNum?: number;
    footable?: boolean | {
        expand?: 'first' | 'all' | 'none';
        expandAll?: boolean;
        accordion?: boolean;
    };
    expandConfig?: {
        expand?: 'first' | 'all' | 'none';
        expandAll?: boolean;
        accordion?: boolean;
    };
    itemCheckableOn?: string;
    itemDraggableOn?: string;
    itemActions?: Array<Action>;
    onSelect: (selectedItems: Array<object>, unSelectedItems: Array<object>) => void;
    onSave?: (items: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<number> | number, unModifiedItems?: Array<object>, rowOrigins?: Array<object> | object) => void;
    onSaveOrder?: (moved: Array<object>, items: Array<object>) => void;
    onQuery: (values: object) => void;
    buildItemProps?: (item: any, index: number) => any;
    checkOnItemClick?: boolean;
    hideCheckToggler?: boolean;
}
export default class Table extends React.Component<TableProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<TableProps>;
    table?: HTMLTableElement;
    sortable?: Sortable;
    dragTip?: HTMLElement;
    affixedTable?: HTMLTableElement;
    parentNode?: HTMLElement | Window;
    lastScrollLeft: number;
    totalWidth: number;
    totalHeight: number;
    outterWidth: number;
    outterHeight: number;
    unSensor: Function;
    updateTableInfoLazy: () => void;
    widths: {
        [propName: string]: number;
    };
    heights: {
        [propName: string]: number;
    };
    renderedToolbars: Array<string>;
    subForms: any;
    constructor(props: TableProps);
    static syncRows(store: ITableStore, props: TableProps, prevProps?: TableProps): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TableProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    subFormRef(form: any, x: number, y: number): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    handleCheck(item: IRow): void;
    handleCheckAll(): void;
    handleQuickChange(item: IRow, values: object, saveImmediately?: boolean | any, savePristine?: boolean): void;
    handleSave(): Promise<void>;
    handleSaveOrder(): void;
    syncSelected(): void;
    reset(): void;
    bulkUpdate(value: any, items: Array<object>): void;
    getSelected(): any[];
    affixDetect(): void;
    updateTableInfo(): void;
    handleOutterScroll(): void;
    tableRef(ref: HTMLTableElement): void;
    dragTipRef(ref: any): void;
    affxiedTableRef(ref: HTMLTableElement): void;
    initDragging(): void;
    destroyDragging(): void;
    getPopOverContainer(): Element | Text | null;
    handleMouseMove(e: React.MouseEvent<any>): void;
    handleMouseLeave(): void;
    draggingTr: HTMLTableRowElement;
    originIndex: number;
    draggingSibling: Array<HTMLTableRowElement>;
    handleDragStart(e: React.DragEvent): void;
    handleDragOver(e: any): void;
    handleDrop(): void;
    handleDragEnd(): void;
    renderHeading(): JSX.Element | null;
    renderHeadCell(column: IColumn, props?: any): JSX.Element;
    renderCell(region: string, column: IColumn, item: IRow, props: any): JSX.Element | null;
    renderAffixHeader(tableClassName: string): JSX.Element | null;
    renderFxiedColumns(columns: Array<IColumn>, headerOnly?: boolean, tableClassName?: string): JSX.Element;
    renderToolbar(toolbar: SchemaNode, index: number): JSX.Element | null | undefined;
    renderColumnsToggler(config?: any): JSX.Element | null;
    renderDragToggler(): JSX.Element | null;
    renderActions(region: string): JSX.Element | null;
    renderHeader(editable?: boolean): JSX.Element | JSX.Element[] | null;
    renderFooter(): JSX.Element | JSX.Element[] | null;
    renderRows(rows: Array<any>): any;
    renderItemActions(): JSX.Element | null;
    render(): JSX.Element;
}
export declare class TableRenderer extends Table {
}
export interface QuickSearchConfig {
    type?: string;
    controls?: any;
    tabs?: any;
    fieldSet?: any;
    [propName: string]: any;
}
export interface HeadCellSearchProps extends RendererProps {
    name: string;
    searchable: boolean | QuickSearchConfig;
    classPrefix: string;
    onQuery: (values: object) => void;
}
export declare class HeadCellSearchDropDown extends React.Component<HeadCellSearchProps, any> {
    state: {
        isOpened: boolean;
    };
    constructor(props: HeadCellSearchProps);
    buildSchema(): "error" | {
        type: string;
        wrapperComponent: string;
        actions: ({
            type: string;
            label: string;
            actionType: string;
            primary?: undefined;
        } | {
            label: string;
            type: string;
            primary: boolean;
            actionType?: undefined;
        })[];
        controls?: any;
        tabs?: any;
        fieldSet?: any;
        title: string;
    } | {
        type: string;
        wrapperComponent: string;
        actions: ({
            type: string;
            label: string;
            actionType: string;
            primary?: undefined;
        } | {
            label: string;
            type: string;
            primary: boolean;
            actionType?: undefined;
        })[];
        title: string;
        className: any;
        controls: {
            type: string;
            controls?: any;
            tabs?: any;
            fieldSet?: any;
            name: any;
            placeholder: any;
        }[];
    };
    handleClickOutside(): void;
    open(): void;
    close(): void;
    handleAction(e: any, action: Action, ctx: object): void;
    handleSubmit(values: any): void;
    render(): JSX.Element;
}
export interface QuickFilterConfig {
    options: Array<any>;
    source: Api;
    multiple: boolean;
    [propName: string]: any;
}
export interface HeadCellFilterProps extends RendererProps {
    data: any;
    name: string;
    filterable: QuickFilterConfig;
    onQuery: (values: object) => void;
}
export declare class HeadCellFilterDropDown extends React.Component<HeadCellFilterProps, any> {
    state: {
        isOpened: boolean;
        filterOptions: never[];
    };
    sourceInvalid: boolean;
    constructor(props: HeadCellFilterProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: HeadCellFilterProps): void;
    componentDidUpdate(): void;
    fetchOptions(): void;
    alterOptions(options: Array<any>): any[];
    handleClickOutside(): void;
    open(): void;
    close(): void;
    handleClick(value: string): void;
    handleCheck(value: string): void;
    render(): JSX.Element;
}
export interface TableCellProps extends RendererProps {
    wrapperComponent?: React.ReactType;
    column: object;
}
export declare class TableCell extends React.Component<RendererProps> {
    static defaultProps: {
        wrapperComponent: string;
    };
    static propsList: Array<string>;
    render(): JSX.Element;
}
export declare class TableCellRenderer extends TableCell {
    static propsList: string[];
}
export declare class FieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
}
