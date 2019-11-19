import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
import { IListStore, IItem } from '../store/list';
import Sortable = require('sortablejs');
import { TableCell } from './Table';
export interface Column {
    type: string;
    [propName: string]: any;
}
export interface ListProps extends RendererProps {
    title?: string;
    header?: SchemaNode;
    body?: SchemaNode;
    footer?: SchemaNode;
    store: IListStore;
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    listItem?: any;
    source?: string;
    selectable?: boolean;
    selected?: Array<any>;
    valueField?: string;
    draggable?: boolean;
    onSelect: (selectedItems: Array<object>, unSelectedItems: Array<object>) => void;
    onSave?: (items: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<number> | number, unModifiedItems?: Array<object>, rowOrigins?: Array<object> | object) => void;
    onSaveOrder?: (moved: Array<object>, items: Array<object>) => void;
    onQuery: (values: object) => void;
    hideCheckToggler?: boolean;
    itemCheckableOn?: string;
    itemDraggableOn?: string;
    size?: 'sm' | 'base';
}
export default class List extends React.Component<ListProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<ListProps>;
    dragTip?: HTMLElement;
    sortable?: Sortable;
    parentNode?: any;
    body?: any;
    renderedToolbars: Array<string>;
    constructor(props: ListProps);
    static syncItems(store: IListStore, props: ListProps, prevProps?: ListProps): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ListProps): void;
    componentWillUnmount(): void;
    bodyRef(ref: HTMLDivElement): void;
    affixDetect(): void;
    getPopOverContainer(): Element | Text | null;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    handleCheck(item: IItem): void;
    handleCheckAll(): void;
    syncSelected(): void;
    handleQuickChange(item: IItem, values: object, saveImmediately?: boolean | any, savePristine?: boolean): void;
    handleSave(): void;
    handleSaveOrder(): void;
    reset(): void;
    bulkUpdate(value: object, items: Array<object>): void;
    getSelected(): any[];
    dragTipRef(ref: any): void;
    initDragging(): void;
    destroyDragging(): void;
    renderActions(region: string): JSX.Element | null;
    renderHeading(): JSX.Element | null;
    renderHeader(): JSX.Element | JSX.Element[] | null;
    renderFooter(): JSX.Element | JSX.Element[] | null;
    renderCheckAll(): JSX.Element | null;
    renderDragToggler(): JSX.Element | null;
    renderToolbar(toolbar: SchemaNode, index: number): JSX.Element | null | undefined;
    render(): JSX.Element;
}
export declare class ListRenderer extends List {
    dragging: boolean;
    selectable: boolean;
    selected: boolean;
    title?: string;
    subTitle?: string;
    desc?: string;
    avatar?: string;
    avatarClassName?: string;
    body?: SchemaNode;
    actions?: Array<Action>;
    onCheck: (item: IItem) => void;
}
export interface ListItemProps extends RendererProps {
    hideCheckToggler?: boolean;
    item: IItem;
    itemIndex?: number;
    checkable?: boolean;
    checkOnItemClick?: boolean;
}
export declare class ListItem extends React.Component<ListItemProps> {
    static defaultProps: Partial<ListItemProps>;
    static propsList: Array<string>;
    constructor(props: ListItemProps);
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleCheck(): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    handleQuickChange(values: object, saveImmediately?: boolean, savePristine?: boolean): void;
    renderLeft(): JSX.Element | null;
    renderRight(): JSX.Element | null;
    renderChild(node: SchemaNode, region?: string, key?: any): React.ReactNode;
    itemRender(field: any, index: number, props: any): JSX.Element | null;
    renderFeild(region: string, field: any, key: any, props: any): JSX.Element | null;
    renderBody(): {} | null | undefined;
    render(): JSX.Element;
}
export declare class ListItemRenderer extends ListItem {
}
export declare class ListItemFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    static propsList: string[];
    render(): JSX.Element;
}
