/**
 * @file Modal
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface ModalProps {
    className?: string;
    size?: any;
    overlay?: boolean;
    onHide: () => void;
    closeOnEsc?: boolean;
    container?: any;
    show?: boolean;
    disabled?: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
    onExited?: () => void;
    onEntered?: () => void;
}
export interface ModalState {
}
export declare class Modal extends React.Component<ModalProps, ModalState> {
    static defaultProps: {
        container: HTMLElement;
        size: string;
        overlay: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleEntered: () => void;
    handleExited: () => void;
    modalRef: (ref: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<ModalProps, "disabled" | "show" | "className" | "onHide" | "classPrefix" | "classnames" | "closeOnEsc" | "onExited" | "onEntered"> & Partial<Pick<ModalProps, "overlay" | "size" | "container">> & Partial<Pick<{
    container: HTMLElement;
    size: string;
    overlay: boolean;
}, never>>, "disabled" | "show" | "overlay" | "size" | "className" | "onHide" | "container" | "closeOnEsc" | "onExited" | "onEntered"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Modal;
};
export default _default;
