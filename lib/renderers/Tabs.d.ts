import React from 'react';
import { RendererProps } from '../factory';
import { Schema } from '../types';
import { ClassNamesFn } from '../theme';
export interface TabProps extends Schema {
    title?: string;
    icon?: string;
    hash?: string;
    tab?: Schema;
    className?: string;
    classnames: ClassNamesFn;
    eventKey?: string | number;
    activeKey?: string | number;
    reload?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    disabled?: string;
    disabledOn?: string;
}
export interface TabsProps extends RendererProps {
    mode?: '' | 'line' | 'card' | 'radio' | 'vertical';
    tabsMode?: '' | 'line' | 'card' | 'radio' | 'vertical';
    activeKey: string | number;
    contentClassName: string;
    location?: any;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    tabs?: Array<TabProps>;
    tabRender?: (tab: TabProps, props?: TabsProps) => JSX.Element;
}
export interface TabsState {
    activeKey: any;
    prevKey: any;
}
export default class Tabs extends React.Component<TabsProps, TabsState> {
    static defaultProps: Partial<TabsProps>;
    constructor(props: TabsProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TabsProps): void;
    componentDidUpdate(): void;
    autoJumpToNeighbour(): void;
    handleSelect(key: any): void;
    switchTo(index: number): void;
    currentIndex(): number;
    render(): JSX.Element | null;
}
export declare class TabsRenderer extends Tabs {
}
