/**
 * @file TooltipWrapper
 * @description
 * @author fex
 */
import React = require('react');
import { ClassNamesFn } from '../theme';
export interface TooltipObject {
    title?: string;
    content?: string;
}
export declare type Trigger = 'hover' | 'click' | 'focus';
export interface TooltipWrapperProps {
    classPrefix: string;
    classnames: ClassNamesFn;
    placement: 'top' | 'right' | 'bottom' | 'left';
    tooltip?: string | TooltipObject;
    container?: React.ReactNode;
    trigger: Trigger | Array<Trigger>;
    rootClose: boolean;
    overlay?: any;
    delay: number;
    theme?: string;
}
interface TooltipWrapperState {
    show?: boolean;
}
export declare class TooltipWrapper extends React.Component<TooltipWrapperProps, TooltipWrapperState> {
    static defaultProps: Pick<TooltipWrapperProps, 'placement' | 'trigger' | 'rootClose' | 'delay'>;
    target: HTMLElement;
    timer: number;
    constructor(props: TooltipWrapperProps);
    componentWillUnmount(): void;
    getTarget(): Element | Text | null;
    targetRef(ref: HTMLElement): void;
    show(): void;
    hide(): void;
    getChildProps(): any;
    handleShow(): void;
    handleHide(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleMouseOver(e: any): void;
    handleMouseOut(e: any): void;
    handleMouseOverOut(handler: Function, e: React.MouseEvent<HTMLElement>, relatedNative: string): void;
    handleClick(e: any): void;
    render(): {} | null | undefined;
}
declare const _default: React.ComponentClass<Pick<Pick<TooltipWrapperProps, "overlay" | "tooltip" | "container" | "classPrefix" | "theme" | "classnames"> & Partial<Pick<TooltipWrapperProps, "placement" | "rootClose" | "trigger" | "delay">> & Partial<Pick<Pick<TooltipWrapperProps, "placement" | "rootClose" | "trigger" | "delay">, never>>, "overlay" | "tooltip" | "placement" | "rootClose" | "container" | "theme" | "trigger" | "delay"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof TooltipWrapper;
};
export default _default;
