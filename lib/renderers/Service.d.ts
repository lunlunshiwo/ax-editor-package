import React from 'react';
import { RendererProps } from '../factory';
import { IServiceStore } from '../store/service';
import { Api, SchemaNode, RendererData } from '../types';
import { IScopedContext } from '../Scoped';
export interface ServiceProps extends RendererProps {
    api?: Api;
    schemaApi?: Api;
    initFetch?: boolean;
    initFetchOn?: string;
    initFetchSchema?: boolean;
    interval?: number;
    silentPolling?: boolean;
    stopAutoRefreshWhen?: string;
    store: IServiceStore;
    body?: SchemaNode;
    messages: {
        fetchSuccess?: string;
        fetchFailed?: string;
    };
}
export default class Service extends React.Component<ServiceProps> {
    timer: number;
    mounted: boolean;
    static defaultProps: Partial<ServiceProps>;
    static propsList: Array<string>;
    constructor(props: ServiceProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ServiceProps): void;
    componentWillUnmount(): void;
    initInterval(value: any): any;
    reload(subpath?: string, query?: any, ctx?: RendererData, silent?: boolean): void;
    silentReload(target?: string, query?: any): void;
    receive(values: object): void;
    handleQuery(query: any): void;
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
export declare class ServiceRenderer extends Service {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
