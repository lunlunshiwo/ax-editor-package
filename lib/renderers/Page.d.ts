import React from 'react';
import { RendererProps } from '../factory';
import { IServiceStore } from '../store/service';
import { Api, SchemaNode, Action, Location } from '../types';
import { IScopedContext } from '../Scoped';
export interface PageProps extends RendererProps {
    title?: string;
    subTitle?: string;
    remark?: any;
    initApi?: Api;
    initFetchOn?: string;
    initFetch?: boolean;
    interval?: number;
    silentPolling?: boolean;
    stopAutoRefreshWhen?: string;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    asideClassName?: string;
    toolbarClassName?: string;
    header?: SchemaNode;
    toolbar?: SchemaNode;
    body?: SchemaNode;
    aside?: SchemaNode;
    location?: Location;
    store: IServiceStore;
    messages?: {
        fetchFailed?: string;
        fetchSuccess?: string;
        saveFailed?: string;
        saveSuccess?: string;
    };
}
export default class Page extends React.Component<PageProps> {
    timer: number;
    mounted: boolean;
    static defaultProps: {
        asideClassName: string;
        bodyClassName: string;
        headerClassName: string;
        initFetch: boolean;
        toolbarClassName: string;
        messages: {};
    };
    static propsList: Array<string>;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: PageProps): void;
    componentDidUpdate(prevProps: PageProps): void;
    componentWillUnmount(): void;
    reloadTarget(target: string, data?: any): void;
    handleAction(e: React.UIEvent<any> | void, action: Action, ctx: object, delegate?: boolean): void;
    handleDialogConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDialogClose(): void;
    handleDrawerConfirm(values: object[], action: Action, ...args: Array<any>): void;
    handleDrawerClose(): void;
    handleClick(e: any): void;
    openFeedback(dialog: any, ctx: any): Promise<{}>;
    reload(subpath?: any, query?: any, ctx?: any, silent?: boolean): void;
    receive(values: object): void;
    silentReload(target?: string, query?: any): void;
    initInterval(value: any): any;
    renderHeader(): JSX.Element | undefined;
    render(): JSX.Element;
}
export declare class PageRenderer extends Page {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
    reloadTarget(target: string, data?: any): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object, throwErrors?: boolean, delegate?: boolean): void;
    handleDialogConfirm(values: object[], action: Action, ...rest: Array<any>): void;
    handleDrawerConfirm(values: object[], action: Action, ...rest: Array<any>): void;
}
