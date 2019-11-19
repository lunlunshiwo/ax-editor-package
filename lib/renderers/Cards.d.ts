import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
import { IListStore, IItem } from '../store/list';
import Sortable = require('sortablejs');
export interface Column {
    type: string;
    [propName: string]: any;
}
export interface GridProps extends RendererProps {
    title?: string;
    header?: SchemaNode;
    body?: SchemaNode;
    footer?: SchemaNode;
    store: IListStore;
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    itemClassName?: string;
    card?: any;
    source?: string;
    selectable?: boolean;
    selected?: Array<any>;
    multiple?: boolean;
    valueField?: string;
    draggable?: boolean;
    onSelect: (selectedItems: Array<object>, unSelectedItems: Array<object>) => void;
    onSave?: (items: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<number> | number, unModifiedItems?: Array<object>, rowOrigins?: Array<object> | object) => void;
    onSaveOrder?: (moved: Array<object>, items: Array<object>) => void;
    onQuery: (values: object) => void;
    hideCheckToggler?: boolean;
    itemCheckableOn?: string;
    itemDraggableOn?: string;
    checkOnItemClick?: boolean;
    masonryLayout?: boolean;
}
export default class Cards extends React.Component<GridProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<GridProps>;
    dragTip?: HTMLElement;
    sortable?: Sortable;
    parentNode?: any;
    body?: any;
    unSensor: Function;
    renderedToolbars: Array<string>;
    constructor(props: GridProps);
    static syncItems(store: IListStore, props: GridProps, prevProps?: GridProps): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: GridProps): void;
    componentWillUnmount(): void;
    bodyRef(ref: HTMLDivElement): void;
    itemsRef(ref: HTMLDivElement): void;
    affixDetect(): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    handleCheck(item: IItem): void;
    handleCheckAll(): void;
    syncSelected(): void;
    handleQuickChange(item: IItem, values: object, saveImmediately?: boolean | any, saveSilent?: boolean): void;
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
export declare class CardsRenderer extends Cards {
    dragging: boolean;
    selectable: boolean;
    selected: boolean;
    onSelect: boolean;
    title?: string;
    subTitle?: string;
    desc?: string;
    avatar?: string;
    avatarClassName?: string;
    body?: SchemaNode;
    actions?: Array<Action>;
}
