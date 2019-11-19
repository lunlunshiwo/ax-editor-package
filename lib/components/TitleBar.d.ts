/**
 * @file TitleBar。
 * @description
 * @author fex
 * @param 参数说明：
 * title 标题内容
 * titleClassName 标题类名，默认为 bg-light lter b-b
 * right 可以传入右侧节点, 当有右侧时自动采用 hbox 来左右布局。
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface TitleBarProps {
    className?: string;
    title: React.ReactNode;
    titleClassName?: string;
    right?: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class TitleBar extends React.PureComponent<TitleBarProps, any> {
    static defaultProps: {
        className: string;
        title: string;
        titleClassName: string;
        right: boolean;
    };
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<TitleBarProps, "classPrefix" | "classnames"> & Partial<Pick<TitleBarProps, "right" | "title" | "className" | "titleClassName">> & Partial<Pick<{
    className: string;
    title: string;
    titleClassName: string;
    right: boolean;
}, never>>, "right" | "title" | "className" | "titleClassName"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof TitleBar;
};
export default _default;
