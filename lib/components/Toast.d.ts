/**
 * @file Toast
 * @description toast提示组件, 单例模式，App级别只需要一个ToastComponent，引入了多个会兼容，也只有第一个生效
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface ToastComponentProps {
    position: 'top-right' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right';
    closeButton: boolean;
    timeOut: number;
    extendedTimeOut: number;
    classPrefix: string;
    classnames: ClassNamesFn;
    className?: string;
}
interface Item {
    title?: string;
    body: string;
    level: 'info' | 'success' | 'error' | 'warning';
    id: string;
}
interface ToastComponentState {
    items: Array<Item>;
}
export declare class ToastComponent extends React.Component<ToastComponentProps, ToastComponentState> {
    static defaultProps: Pick<ToastComponentProps, 'position' | 'closeButton' | 'timeOut' | 'extendedTimeOut'>;
    hasRendered: boolean;
    state: ToastComponentState;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    notifiy(level: string, content: string, title?: string, config?: any): void;
    success(content: string, title?: string, config?: any): void;
    error(content: string, title?: string, config?: any): void;
    info(content: string, title?: string, config?: any): void;
    warning(content: string, title?: string, config?: any): void;
    handleDismissed(index: number): void;
    render(): JSX.Element | null;
}
declare const _default: React.ComponentClass<Pick<Pick<ToastComponentProps, "className" | "classPrefix" | "classnames"> & Partial<Pick<ToastComponentProps, "position" | "closeButton" | "timeOut" | "extendedTimeOut">> & Partial<Pick<Pick<ToastComponentProps, "position" | "closeButton" | "timeOut" | "extendedTimeOut">, never>>, "className" | "position" | "closeButton" | "timeOut" | "extendedTimeOut"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof ToastComponent;
};
export default _default;
interface ToastMessageProps {
    title?: string;
    body: string;
    level: 'info' | 'success' | 'error' | 'warning';
    timeOut: number;
    position: 'top-right' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right';
    onDismiss?: () => void;
    classPrefix: string;
    allowHtml: boolean;
}
export declare class ToastMessage extends React.Component<ToastMessageProps> {
    static defaultProps: {
        timeOut: number;
        classPrefix: string;
        position: string;
        allowHtml: boolean;
        level: string;
    };
    state: {
        visible: boolean;
    };
    timer: NodeJS.Timeout;
    constructor(props: ToastMessageProps);
    componentWillUnmount(): void;
    componentDidMount(): void;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    handleEntered(): void;
    close(): void;
    render(): JSX.Element;
}
export declare const toast: {
    container: any;
    success: (content: string, title?: string | undefined, conf?: any) => void;
    error: (content: string, title?: string | undefined, conf?: any) => void;
    info: (content: string, title?: string | undefined, conf?: any) => void;
    warning: (content: string, title?: string | undefined, conf?: any) => void;
};
