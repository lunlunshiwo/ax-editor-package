import React from 'react';
import { RendererProps } from '../factory';
export interface TplProps extends RendererProps {
    className?: string;
    tpl?: string;
    html?: string;
    text?: string;
    raw?: string;
    value?: string;
    wrapperComponent?: any;
    inline?: boolean;
}
export declare class Tpl extends React.Component<TplProps, object> {
    static defaultProps: Partial<TplProps>;
    dom: any;
    constructor(props: TplProps);
    componentDidUpdate(prevProps: TplProps): void;
    htmlRef(dom: any): void;
    getContent(): string;
    _render(): void;
    render(): JSX.Element;
}
export declare class TplRenderer extends Tpl {
}
