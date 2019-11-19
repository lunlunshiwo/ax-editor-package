/**
 * @file Tooltip
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
    title?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    theme?: string;
    className?: string;
    style?: any;
    arrowProps?: any;
    placement?: string;
    [propName: string]: any;
}
export declare class Tooltip extends React.Component<TooltipProps> {
    static defaultProps: {
        className: string;
    };
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<TooltipProps, string | number> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Tooltip;
};
export default _default;
