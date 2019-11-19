/**
 * @file scoped.jsx.
 * @author fex
 */
import React from 'react';
import { RendererProps } from '../factory';
export interface CopyableConfig {
}
export interface CopyableConfig {
    icon?: string;
    content?: string;
    [propName: string]: any;
}
export interface CopyableProps extends RendererProps {
    name?: string;
    label?: string;
    copyable: boolean | CopyableConfig;
}
export declare const HocCopyable: () => (Component: React.ComponentType<any>) => any;
export default HocCopyable;
