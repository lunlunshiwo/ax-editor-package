import React from 'react';
import { RendererProps } from '../factory';
import { PlainObject } from '../types';
export interface MappingProps extends RendererProps {
    className?: string;
    placeholder?: string;
    map: PlainObject;
}
export declare class MappingField extends React.Component<MappingProps, object> {
    static defaultProps: Partial<MappingProps>;
    render(): JSX.Element;
}
export declare class MappingFieldRenderer extends MappingField {
}
