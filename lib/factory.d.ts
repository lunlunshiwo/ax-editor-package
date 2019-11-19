import React from 'react';
import { IRendererStore, IIRendererStore } from './store/index';
import { Location } from 'history';
import { Api, fetcherResult, Payload, SchemaNode, Schema, Action } from './types';
import { ThemeInstance, ClassNamesFn } from './theme';
export interface TestFunc {
    (path: string, schema?: Schema, resolveRenderer?: (path: string, schema?: Schema, props?: any) => null | RendererConfig): boolean;
}
export interface RendererBasicConfig {
    test: RegExp | TestFunc;
    name?: string;
    storeType?: string;
    storeExtendsData?: boolean;
    weight?: number;
    isolateScope?: boolean;
    isFormItem?: boolean;
}
export interface RendererEnv {
    fetcher: (api: Api, data?: any, options?: object) => Promise<Payload>;
    isCancel: (val: any) => boolean;
    notify: (type: 'error' | 'success', msg: string) => void;
    jumpTo: (to: string, action?: Action, ctx?: object) => void;
    alert: (msg: string) => void;
    confirm: (msg: string, title?: string) => Promise<boolean>;
    updateLocation: (location: any, replace?: boolean) => void;
    isCurrentUrl: (link: string) => boolean;
    rendererResolver?: (path: string, schema: Schema, props: any) => null | RendererConfig;
    copy?: (contents: string) => void;
    getModalContainer?: () => HTMLElement;
    theme: ThemeInstance;
    affixOffsetTop: number;
    affixOffsetBottom: number;
    richTextToken: string;
    loadRenderer: (schema: Schema, path: string, reRender: Function) => Promise<React.ReactType> | React.ReactType | JSX.Element | void;
    [propName: string]: any;
}
export interface RendererProps {
    render: (region: string, node: SchemaNode, props?: any) => JSX.Element;
    env: RendererEnv;
    classPrefix: string;
    classnames: ClassNamesFn;
    $path: string;
    store?: IIRendererStore;
    data: {
        [propName: string]: any;
    };
    defaultData?: object;
    className?: string;
    [propName: string]: any;
}
export interface renderChildProps extends Partial<RendererProps> {
    env: RendererEnv;
}
export declare type RendererComponent = React.ComponentType<RendererProps> & {
    propsList?: Array<string>;
};
export interface RendererConfig extends RendererBasicConfig {
    component: RendererComponent;
    Renderer?: RendererComponent;
}
export interface RenderSchemaFilter {
    (schema: Schema, renderer: RendererConfig, props?: object): SchemaNode;
}
export interface RootRenderProps {
    location?: Location;
    theme?: string;
    [propName: string]: any;
}
export interface RenderOptions {
    session?: string;
    fetcher?: (config: fetcherConfig) => Promise<fetcherResult>;
    isCancel?: (value: any) => boolean;
    notify?: (type: 'error' | 'success', msg: string) => void;
    jumpTo?: (to: string) => void;
    alert?: (msg: string) => void;
    confirm?: (msg: string, title?: string) => boolean | Promise<boolean>;
    rendererResolver?: (path: string, schema: Schema, props: any) => null | RendererConfig;
    copy?: (contents: string) => void;
    getModalContainer?: () => HTMLElement;
    loadRenderer?: (schema: Schema, path: string, reRender: Function) => Promise<React.ReactType> | React.ReactType | JSX.Element | void;
    affixOffsetTop?: number;
    affixOffsetBottom?: number;
    richTextToken?: string;
    [propName: string]: any;
}
export interface fetcherConfig {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    data?: any;
    config?: any;
}
export declare type ReactElement = React.ReactNode[] | JSX.Element | null | false;
export declare function addSchemaFilter(fn: RenderSchemaFilter): void;
export declare function filterSchema(schema: Schema, render: RendererConfig, props?: any): Schema;
export declare function Renderer(config: RendererBasicConfig): <T extends RendererComponent>(component: T) => T;
export declare function registerRenderer(config: RendererConfig): RendererConfig;
export declare function unRegisterRenderer(config: RendererConfig | string): void;
export declare function renderChildren(prefix: string, node: SchemaNode, props: renderChildProps): ReactElement;
export declare function renderChild(prefix: string, node: SchemaNode, props: renderChildProps): ReactElement;
export interface RootRendererProps {
    schema: SchemaNode;
    rootStore: IRendererStore;
    env: RendererEnv;
    theme: string;
    pathPrefix?: string;
    [propName: string]: any;
}
export declare class RootRenderer extends React.Component<RootRendererProps> {
    state: {
        error: null;
        errorInfo: null;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    resolveDefinitions(name: string): {} | undefined;
    render(): JSX.Element;
}
export declare const ScopedRootRenderer: (React.ComponentClass<RootRendererProps & {
    scopeRef?: ((ref: any) => void) | undefined;
}, any> & {
    ComposedComponent: React.ComponentType<RootRendererProps>;
}) | (React.FunctionComponent<RootRendererProps & {
    scopeRef?: ((ref: any) => void) | undefined;
}> & {
    ComposedComponent: React.ComponentType<RootRendererProps>;
});
export declare function HocStoreFactory(renderer: {
    storeType: string;
    extendsData?: boolean;
}): any;
export declare function render(schema: SchemaNode, props?: RootRenderProps, options?: RenderOptions, pathPrefix?: string): JSX.Element;
export declare function clearStoresCache(sessions?: Array<string>): void;
export declare function resolveRenderer(path: string, schema?: Schema, props?: any): null | RendererConfig;
export declare function getRenderers(): RendererConfig[];
export declare function getRendererByName(name: string): RendererConfig | undefined;
