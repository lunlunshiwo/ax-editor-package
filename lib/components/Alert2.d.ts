/**
 * @file Alert2
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface AlertProps {
    level: 'danger' | 'info' | 'success' | 'warning';
    className: string;
    showCloseButton: boolean;
    onClose?: () => void;
    classnames: ClassNamesFn;
    classPrefix: string;
}
export interface AlertState {
    show: boolean;
}
export declare class Alert extends React.Component<AlertProps, AlertState> {
    static defaultProps: Pick<AlertProps, 'level' | 'className' | 'showCloseButton'>;
    static propsList: Array<string>;
    constructor(props: AlertProps);
    handleClick(): void;
    render(): JSX.Element | null;
}
declare const _default: React.ComponentClass<Pick<Pick<AlertProps, "classPrefix" | "classnames" | "onClose"> & Partial<Pick<AlertProps, "className" | "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, never>>, "className" | "level" | "showCloseButton" | "onClose"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Alert;
};
export default _default;
