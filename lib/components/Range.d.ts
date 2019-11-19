/**
 * @file Range
 * @description
 * @author fex
 */
import React from 'react';
import { RendererProps } from '../factory';
import { ClassNamesFn } from '../theme';
interface RangeProps extends RendererProps {
    id?: string;
    className?: string;
    min: number;
    max: number;
    value: {
        min: number;
        max: number;
    } | number;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Range extends React.Component<RangeProps, any> {
    static defaultProps: Partial<RangeProps>;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<RangeProps, string | number> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Range;
};
export default _default;
