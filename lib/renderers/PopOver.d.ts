/**
 * @file scoped.jsx.
 * @author fex
 */
import React from 'react';
import { RendererProps } from '../factory';
import { Offset } from '../components/PopOver';
export interface PopOverConfig {
    saveImmediately?: boolean;
    mode?: 'dialog' | 'drawer' | 'popOver';
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    position: 'center' | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'fixed-center' | 'fixed-left-top' | 'fixed-right-top' | 'fixed-left-bottom' | 'fixed-right-bottom';
    [propName: string]: any;
    offset: Offset;
}
export interface PopOverProps extends RendererProps {
    name?: string;
    label?: string;
    popOver: boolean | PopOverConfig;
    onPopOverOpen: (popover: any) => void;
    onPopOverClose: (popover: any) => void;
}
export interface PopOverState {
    isOpened: boolean;
}
export declare const HocPopOver: (config?: Partial<PopOverConfig>) => (Component: React.ComponentType<any>) => any;
export default HocPopOver;
