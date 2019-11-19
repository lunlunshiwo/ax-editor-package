import React from 'react';
import { RendererProps } from '../factory';
import { PlainObject } from '../types';
export interface SwitchProps extends RendererProps {
    className?: string;
    placeholder?: string;
    format?: string;
    valueFormat?: string;
    map: PlainObject;
}
export declare class SwitchField extends React.Component<SwitchProps, object> {
    static defaultProps: Partial<SwitchProps>;
    constructor(props: SwitchProps);
    handleChange(checked: boolean): void;
    render(): JSX.Element;
}
export declare class SwitchFieldRenderer extends SwitchField {
}
