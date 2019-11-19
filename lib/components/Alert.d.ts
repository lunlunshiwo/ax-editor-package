/**
 * @file Alert
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface AlertProps {
    container?: any;
    confirmText?: string;
    cancelText?: string;
    title?: string;
    confirmBtnLevel?: string;
    alertBtnLevel?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    theme?: string;
}
export interface AlertState {
    show: boolean;
    title?: string;
    content: string;
    confirm: boolean;
}
export declare class Alert extends React.Component<AlertProps, AlertState> {
    static instance: any;
    static getInstance(): any;
    _resolve: (value: any) => void;
    _modal: any;
    _body: any;
    state: AlertState;
    constructor(props: AlertProps);
    static defaultProps: {
        confirmText: string;
        cancelText: string;
        title: string;
        alertBtnLevel: string;
        confirmBtnLevel: string;
    };
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: AlertProps, prevState: AlertState): void;
    componentWillUnmount(): void;
    handleConfirm(): void;
    handleCancel(): void;
    close(confirmed: boolean): void;
    alert(content: string, title?: string): void;
    confirm(content: string, title?: string): Promise<{}>;
    modalRef(ref: any): void;
    bodyRef(ref: any): void;
    render(): JSX.Element;
}
export declare const alert: (content: string, title?: string) => void;
export declare const confirm: (content: string, title?: string) => Promise<any>;
export declare const ThemedAlert: React.ComponentClass<Pick<Pick<AlertProps, "container" | "classPrefix" | "theme" | "classnames"> & Partial<Pick<AlertProps, "title" | "confirmText" | "cancelText" | "confirmBtnLevel" | "alertBtnLevel">> & Partial<Pick<{
    confirmText: string;
    cancelText: string;
    title: string;
    alertBtnLevel: string;
    confirmBtnLevel: string;
}, never>>, "title" | "container" | "theme" | "confirmText" | "cancelText" | "confirmBtnLevel" | "alertBtnLevel"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Alert;
};
export default ThemedAlert;
