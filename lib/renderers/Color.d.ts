/**
 * @file 用来展示颜色块。
 */
import React from 'react';
import { RendererProps } from '../factory';
export interface ColorProps extends RendererProps {
    className: string;
    defaultColor: string;
    showValue: boolean;
}
export declare class ColorField extends React.Component<ColorProps, object> {
    static defaultProps: {
        className: string;
        defaultColor: string;
        showValue: boolean;
    };
    render(): JSX.Element;
}
export declare class ColorFieldRenderer extends ColorField {
}
