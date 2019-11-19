import React from 'react';
import { RendererProps } from '../factory';
import { PlainObject } from '../types';
export interface ProgressProps extends RendererProps {
    className?: string;
    placeholder?: string;
    format?: string;
    valueFormat?: string;
    map: PlainObject;
}
export declare class ProgressField extends React.Component<ProgressProps, object> {
    static defaultProps: {
        placeholder: string;
        progressClassName: string;
        progressBarClassName: string;
        map: string[];
        showLabel: boolean;
    };
    autoClassName(value: number): any;
    render(): JSX.Element;
}
export declare class ProgressFieldRenderer extends ProgressField {
}
