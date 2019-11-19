/**
 * @file Collapse
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface CollapseProps {
    show?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    className?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Collapse extends React.Component<CollapseProps, any> {
    static defaultProps: Pick<CollapseProps, 'show' | 'mountOnEnter' | 'unmountOnExit'>;
    contentDom: any;
    contentRef: (ref: any) => any;
    handleEnter(elem: HTMLElement): void;
    handleEntering(elem: HTMLElement): void;
    handleEntered(elem: HTMLElement): void;
    handleExit(elem: HTMLElement): void;
    handleExiting(elem: HTMLElement): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<CollapseProps, "className" | "classPrefix" | "classnames"> & Partial<Pick<CollapseProps, "show" | "mountOnEnter" | "unmountOnExit">> & Partial<Pick<Pick<CollapseProps, "show" | "mountOnEnter" | "unmountOnExit">, never>>, "show" | "className" | "mountOnEnter" | "unmountOnExit"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Collapse;
};
export default _default;
