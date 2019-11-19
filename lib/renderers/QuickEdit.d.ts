/**
 * @file scoped.jsx.
 * @author fex
 */
import React from 'react';
import { RendererProps } from '../factory';
export interface QuickEditConfig {
}
export interface QuickEditConfig {
    saveImmediately?: boolean;
    mode?: 'inline' | 'dialog' | 'popOver' | 'append';
    type?: string;
    controls?: any;
    tabs?: any;
    fieldSet?: any;
    focusable?: boolean;
    popOverClassName?: string;
    [propName: string]: any;
}
export interface QuickEditProps extends RendererProps {
    name?: string;
    label?: string;
    quickEdit: boolean | QuickEditConfig;
    quickEditEnabled?: boolean;
}
export interface QuickEditState {
    isOpened: boolean;
}
export declare const HocQuickEdit: (config?: Partial<QuickEditConfig>) => (Component: React.ComponentType<any>) => any;
export default HocQuickEdit;
