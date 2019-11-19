import React from 'react';
import { RendererProps } from '../factory';
import { Action } from '../types';
export interface OperationProps extends RendererProps {
    className?: string;
    buttons: Array<Action>;
}
export declare class OperationField extends React.Component<OperationProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<OperationProps>;
    render(): JSX.Element;
}
export declare class OperationFieldRenderer extends OperationField {
}
