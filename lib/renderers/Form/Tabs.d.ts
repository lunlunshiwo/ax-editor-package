import React from 'react';
import { RendererProps } from '../../factory';
export interface TabsProps extends RendererProps {
}
export declare class TabsRenderer extends React.Component<TabsProps, any> {
    static defaultProps: {
        mountOnEnter: boolean;
    };
    constructor(props: TabsProps);
    renderTab(tab: any, { key }: any): JSX.Element;
    render(): JSX.Element;
}
