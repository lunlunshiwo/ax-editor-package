/**
 * @file AsideNav
 * @description 左侧导航。
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export declare type LinkItem = LinkItemProps;
interface LinkItemProps {
    id?: number;
    label: string;
    hidden?: boolean;
    open?: boolean;
    active?: boolean;
    className?: string;
    children?: Array<LinkItem>;
    path?: string;
    icon?: string;
    component?: React.ReactType;
}
interface Navigation {
    label: string;
    children: Array<LinkItem>;
    prefix?: JSX.Element;
    affix?: JSX.Element;
    className?: string;
    [propName: string]: any;
}
interface AsideNavProps {
    id?: string;
    className?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    renderLink: Function;
    isActive: Function;
    isOpen: (link: LinkItemProps) => boolean;
    navigations: Array<Navigation>;
    renderSubLinks: (link: LinkItemProps, renderLink: Function, depth: number, props: AsideNavProps) => React.ReactNode;
}
interface AsideNavState {
    navigations: Array<Navigation>;
}
export declare class AsideNav extends React.Component<AsideNavProps, AsideNavState> {
    static defaultProps: {
        renderLink: (item: LinkItemProps) => JSX.Element;
        renderSubLinks: (link: LinkItemProps, renderLink: Function, depth: number, { classnames: cx }: AsideNavProps) => JSX.Element | null;
        isActive: (link: LinkItemProps) => boolean | undefined;
        isOpen: (item: LinkItemProps) => any;
    };
    constructor(props: AsideNavProps);
    componentWillReceiveProps(nextProps: AsideNavProps): void;
    toggleExpand(link: LinkItemProps, e?: React.MouseEvent<HTMLElement>): void;
    renderLink(link: LinkItemProps, key: any, props?: Partial<AsideNavProps>, depth?: number): React.ReactNode;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<AsideNavProps, "id" | "className" | "classPrefix" | "classnames" | "navigations"> & Partial<Pick<AsideNavProps, "isOpen" | "renderLink" | "isActive" | "renderSubLinks">> & Partial<Pick<{
    renderLink: (item: LinkItemProps) => JSX.Element;
    renderSubLinks: (link: LinkItemProps, renderLink: Function, depth: number, { classnames: cx }: AsideNavProps) => JSX.Element | null;
    isActive: (link: LinkItemProps) => boolean | undefined;
    isOpen: (item: LinkItemProps) => any;
}, never>>, "id" | "className" | "isOpen" | "renderLink" | "isActive" | "navigations" | "renderSubLinks"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof AsideNav;
};
export default _default;
