import React from 'react';
import { RendererProps } from '../factory';
import { IScopedContext } from '../Scoped';
import { Api } from '../types';
export interface Link {
    className?: string;
    label?: string;
    to?: string;
    icon?: string;
    active?: boolean;
    activeOn?: string;
    unfolded?: boolean;
    children?: Links;
    [propName: string]: any;
}
export interface Links extends Array<Link> {
}
export interface NavigationState {
    links: Links;
    error?: string;
}
export interface NavigationProps extends RendererProps {
    className?: string;
    stacked?: boolean;
    links?: Links;
    source?: Api;
}
export default class Navigation extends React.Component<NavigationProps, NavigationState> {
    static defaultProps: Partial<NavigationProps>;
    mounted: boolean;
    constructor(props: NavigationProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: NavigationProps): void;
    componentDidUpdate(prevProps: NavigationProps): void;
    componentWillUnmount(): void;
    reload(target?: string, query?: any, values?: object): void;
    receive(values: object): void;
    syncLinks(props: NavigationProps, links?: Links | undefined, clearActive?: boolean): Links;
    handleClick(link: {
        label?: string;
        to?: string;
        icon?: string;
        children?: Links;
    }): void;
    toggleLink(target: Link): void;
    renderItem(link: Link, index: number): JSX.Element | null;
    render(): JSX.Element;
}
export declare class NavigationRenderer extends Navigation {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
