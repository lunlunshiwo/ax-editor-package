import React from 'react';
import { RendererProps } from '../factory';
export interface JSONProps extends RendererProps {
    className?: string;
    placeholder?: string;
    levelExpand: number;
    jsonTheme: string;
}
export declare class JSONField extends React.Component<JSONProps, object> {
    static defaultProps: Partial<JSONProps>;
    valueRenderer(raw: any): any;
    shouldExpandNode: (keyName: any, data: any, level: any) => boolean;
    render(): JSX.Element;
}
export declare class JSONFieldRenderer extends JSONField {
}
