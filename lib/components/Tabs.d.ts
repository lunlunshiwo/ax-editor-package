/**
 * @file Tabs
 * @description 选项卡
 * @author fex
 */
import React from 'react';
import { Schema } from '../types';
import { ClassNamesFn } from '../theme';
export interface TabProps {
    title?: string;
    icon?: string;
    disabled?: boolean | string;
    eventKey: string | number;
    tab?: Schema;
    className?: string;
    classnames?: ClassNamesFn;
    activeKey?: string | number;
    reload?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    toolbar?: React.ReactNode;
}
export interface TabsProps {
    mode?: '' | 'line' | 'card' | 'radio' | 'vertical';
    tabsMode?: '' | 'line' | 'card' | 'radio' | 'vertical';
    additionBtns?: React.ReactNode;
    onSelect?: (key: string | number) => void;
    classPrefix: string;
    classnames: ClassNamesFn;
    activeKey: string | number;
    contentClassName: string;
    className?: string;
    tabs?: Array<TabProps>;
    tabRender?: (tab: TabProps, props?: TabsProps) => JSX.Element;
}
export declare class Tabs extends React.Component<TabsProps> {
    static defaultProps: Pick<TabsProps, 'mode' | 'contentClassName'>;
    handleSelect(key: string | number): void;
    renderNav(child: any, index: number): JSX.Element | undefined;
    renderTab(child: any, index: number): React.DetailedReactHTMLElement<any, HTMLElement> | undefined;
    render(): JSX.Element | null;
}
export declare class Tab extends React.PureComponent<TabProps> {
    contentDom: any;
    contentRef: (ref: any) => any;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<TabsProps, "activeKey" | "className" | "classPrefix" | "classnames" | "onSelect" | "tabsMode" | "additionBtns" | "tabs" | "tabRender"> & Partial<Pick<TabsProps, "mode" | "contentClassName">> & Partial<Pick<Pick<TabsProps, "mode" | "contentClassName">, never>>, "activeKey" | "mode" | "className" | "onSelect" | "contentClassName" | "tabsMode" | "additionBtns" | "tabs" | "tabRender"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Tabs;
};
export default _default;
