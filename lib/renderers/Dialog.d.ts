import React from 'react';
import { IScopedContext } from '../Scoped';
import { RendererProps } from '../factory';
import { SchemaNode, Action } from '../types';
import { IModalStore } from '../store/modal';
export interface DialogProps extends RendererProps {
    title?: string;
    size?: 'md' | 'lg' | 'sm' | 'xl';
    closeOnEsc?: boolean;
    onClose: () => void;
    onConfirm: (values: Array<object>, action: Action, ctx: object, targets: Array<any>) => void;
    children?: React.ReactNode | ((props?: any) => React.ReactNode);
    store: IModalStore;
    className?: string;
    header?: SchemaNode;
    body?: SchemaNode;
    headerClassName?: string;
    bodyClassName?: string;
    footer?: SchemaNode;
    confirm?: boolean;
    show?: boolean;
    lazyRender?: boolean;
    wrapperComponent: React.ReactType;
    showCloseButton?: boolean;
}
export interface DialogState {
    entered: boolean;
}
export default class Dialog extends React.Component<DialogProps, DialogState> {
    static propsList: Array<string>;
    static defaultProps: Partial<DialogProps>;
    reaction: any;
    $$id: string;
    constructor(props: DialogProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    buildActions(): Array<Action>;
    handleSelfClose(): void;
    handleAction(e: React.UIEvent<any>, action: Action, data: object): void;
    handleDialogConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDialogClose(...args: Array<any>): void;
    handleDrawerConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDrawerClose(...args: Array<any>): void;
    handleEntered(): void;
    handleExited(): void;
    handleFormInit(data: any): void;
    handleFormChange(data: any): void;
    handleFormSaved(data: any, response: any): void;
    handleChildFinished(value: any, action: Action): void;
    openFeedback(dialog: any, ctx: any): Promise<{}>;
    renderBody(body: SchemaNode, key?: any): React.ReactNode;
    renderFooter(): JSX.Element | null;
    render(): JSX.Element;
}
export declare class DialogRenderer extends Dialog {
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
