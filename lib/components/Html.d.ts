/**
 * @file Html
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface HtmlProps {
    className?: string;
    html?: string;
    wrapperComponent?: any;
    inline: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Html extends React.Component<HtmlProps> {
    static defaultProps: {
        inline: boolean;
    };
    dom: any;
    constructor(props: HtmlProps);
    componentDidUpdate(prevProps: HtmlProps): void;
    htmlRef(dom: any): void;
    _render(): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<HtmlProps, "html" | "className" | "classPrefix" | "classnames" | "wrapperComponent"> & Partial<Pick<HtmlProps, "inline">> & Partial<Pick<{
    inline: boolean;
}, never>>, "html" | "inline" | "className" | "wrapperComponent"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Html;
};
export default _default;
