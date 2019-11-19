/**
 * @file Layout
 * @description 页面布局，支持左边栏、顶部、内容区域布局。
 * @author fex
 *
 * @param 参数说明：
 * * children 会渲染在内容区。
 * * header 头部区域
 * * aside 边栏
 * * asideClassName 边栏附加样式class
 * * footer 页脚
 * * folder 是否收起边栏
 * * asideFixed 边栏是否为固定模式，如果是会用 position:fixed 来定位.
 * * className 附件的样式名
 * * contentClassName 内容区域附加样式名称
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface LayoutProps {
    header?: boolean | React.ReactNode;
    aside?: boolean | React.ReactNode;
    asideClassName: string;
    boxed?: boolean;
    folded?: boolean;
    asideFixed: boolean;
    headerFixed: boolean;
    className?: string;
    contentClassName?: string;
    footer: boolean | React.ReactNode;
    offScreen: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
    size?: 'sm' | 'base' | 'md' | 'lg';
    children?: React.ReactNode;
    bodyClassName?: string;
}
export declare function Layout({ header, aside, asideClassName, children, className, contentClassName, folded, asideFixed, headerFixed, footer, offScreen, size, boxed, classnames: cx, bodyClassName }: LayoutProps): JSX.Element;
export declare namespace Layout {
    var defaultProps: {
        asideFixed: boolean;
        asideClassName: string;
        headerFixed: boolean;
        offScreen: boolean;
        footer: boolean;
    };
}
declare const _default: React.ComponentClass<Pick<Pick<LayoutProps, "aside" | "header" | "size" | "children" | "className" | "classPrefix" | "classnames" | "contentClassName" | "folded" | "boxed" | "bodyClassName"> & Partial<Pick<LayoutProps, "footer" | "asideClassName" | "asideFixed" | "headerFixed" | "offScreen">> & Partial<Pick<{
    asideFixed: boolean;
    asideClassName: string;
    headerFixed: boolean;
    offScreen: boolean;
    footer: boolean;
}, never>>, "aside" | "footer" | "header" | "size" | "children" | "className" | "contentClassName" | "asideClassName" | "folded" | "asideFixed" | "headerFixed" | "offScreen" | "boxed" | "bodyClassName"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Layout;
};
export default _default;
