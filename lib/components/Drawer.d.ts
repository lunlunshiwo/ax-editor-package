/**
 * @file Drawer
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
declare type DrawerPosition = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerProps {
    className?: string;
    size: any;
    overlay: boolean;
    onHide: () => void;
    closeOnEsc?: boolean;
    container: any;
    show?: boolean;
    position: DrawerPosition;
    disabled?: boolean;
    closeOnOutside?: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
    onExited?: () => void;
    onEntered?: () => void;
    disableOnClickOutside: () => void;
    enableOnClickOutside: () => void;
}
export interface DrawerState {
}
export declare class Drawer extends React.Component<DrawerProps, DrawerState> {
    static defaultProps: Pick<DrawerProps, 'container' | 'position' | 'size' | 'overlay' | 'disableOnClickOutside' | 'enableOnClickOutside'>;
    contentDom: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    contentRef: (ref: any) => any;
    handleEntered: () => void;
    handleExited: () => void;
    modalRef: (ref: any) => void;
    handleWidgetClick(e: React.MouseEvent): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<DrawerProps, "disabled" | "show" | "className" | "onHide" | "classPrefix" | "classnames" | "closeOnEsc" | "onExited" | "onEntered" | "closeOnOutside"> & Partial<Pick<DrawerProps, "overlay" | "size" | "container" | "disableOnClickOutside" | "position" | "enableOnClickOutside">> & Partial<Pick<Pick<DrawerProps, "overlay" | "size" | "container" | "disableOnClickOutside" | "position" | "enableOnClickOutside">, never>>, "disabled" | "show" | "overlay" | "size" | "className" | "onHide" | "container" | "closeOnEsc" | "onExited" | "onEntered" | "disableOnClickOutside" | "position" | "enableOnClickOutside" | "closeOnOutside"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Drawer;
};
export default _default;
