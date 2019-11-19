import React from 'react';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
import { IItem } from '../store/list';
import { TableCell } from './Table';
export interface CardProps extends RendererProps {
    onCheck: (item: IItem) => void;
    itemIndex?: number;
    multiple?: boolean;
    highlightClassName?: string;
    hideCheckToggler?: boolean;
    item: IItem;
    checkOnItemClick?: boolean;
}
export declare class Card extends React.Component<CardProps> {
    static defaultProps: Partial<CardProps>;
    static propsList: Array<string>;
    constructor(props: CardProps);
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleCheck(): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    handleQuickChange(values: object, saveImmediately?: boolean, savePristine?: boolean): void;
    getPopOverContainer(): Element | Text | null;
    renderToolbar(): JSX.Element | null;
    renderActions(): JSX.Element[] | null;
    renderChild(node: SchemaNode, region?: string, key?: any): React.ReactNode;
    itemRender(field: any, index: number, props: any): JSX.Element | undefined;
    renderFeild(region: string, field: any, key: any, props: any): JSX.Element | undefined;
    renderBody(): {} | null | undefined;
    render(): JSX.Element;
}
export declare class CardRenderer extends Card {
}
export declare class CardItemFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    static propsList: string[];
    render(): JSX.Element;
}
