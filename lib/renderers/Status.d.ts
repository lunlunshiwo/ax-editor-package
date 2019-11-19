import React from 'react';
import { RendererProps } from '../factory';
import { PlainObject } from '../types';
export interface StatusProps extends RendererProps {
    className?: string;
    placeholder?: string;
    map: PlainObject;
}
export declare class StatusField extends React.Component<StatusProps, object> {
    static defaultProps: Partial<StatusProps>;
    render(): JSX.Element;
}
export declare class StatusFieldRenderer extends StatusField {
}
