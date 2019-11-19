import React from 'react';
import { IScopedContext } from '../Scoped';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
import { IModalStore } from '../store/modal';
export interface DrawerProps extends RendererProps {
    title?: string;
    size?: 'md' | 'lg' | 'xs' | 'sm';
    position?: 'left' | 'right' | 'top' | 'bottom';
    closeOnEsc?: boolean;
    onClose: () => void;
    onConfirm: (values: Array<object>, action: Action, ctx: object, targets: Array<any>) => void;
    children?: React.ReactNode | ((props?: any) => React.ReactNode);
    store: IModalStore;
    className?: string;
    header?: SchemaNode;
    body?: SchemaNode;
    bodyClassName?: string;
    footer?: SchemaNode;
    confirm?: boolean;
    show?: boolean;
    resizable?: boolean;
    overlay?: boolean;
    closeOnOutside?: boolean;
    drawerContainer?: () => HTMLElement;
}
export default class Drawer extends React.Component<DrawerProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<DrawerProps>;
    reaction: any;
    $$id: string;
    drawer: any;
    state: {
        resizeCoord: number;
    };
    constructor(props: DrawerProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    buildActions(): Array<Action>;
    handleSelfClose(): void;
    handleAction(e: React.UIEvent<any>, action: Action, data: object): void;
    handleDrawerConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDrawerClose(...args: Array<any>): void;
    handleDialogConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDialogClose(...args: Array<any>): void;
    handleChildFinished(value: any, action: Action): void;
    handleFormInit(data: any): void;
    handleFormChange(data: any): void;
    handleFormSaved(data: any, response: any): void;
    handleExisted(): void;
    renderBody(body: SchemaNode, key?: any): React.ReactNode;
    renderFooter(): JSX.Element | null;
    renderResizeCtrl(): JSX.Element;
    resizeMouseDown(e: React.MouseEvent<any>): void;
    bindResize(e: any): void;
    removeResize(): void;
    openFeedback(dialog: any, ctx: any): Promise<{}>;
    render(): JSX.Element;
}
export declare class DrawerRenderer extends Drawer {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
    tryChildrenToHandle(action: Action, ctx: object, rawAction?: Action): boolean;
    handleAction(e: React.UIEvent<any>, action: Action, data: object, throwErrors?: boolean, delegate?: boolean): any;
    handleChildFinished(value: any, action: Action): void;
    handleDialogConfirm(values: object[], action: Action, ...rest: Array<any>): void;
    handleDrawerConfirm(values: object[], action: Action, ...rest: Array<any>): void;
    reloadTarget(target: string, data?: any): void;
}
