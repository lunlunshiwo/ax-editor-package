import React from 'react';
import { RendererProps } from '../../factory';
export interface InputGroupProps extends RendererProps {
    formMode?: string;
    controls: Array<any>;
    gap?: 'xs' | 'sm' | 'normal';
    direction: 'horizontal' | 'vertical';
}
export declare class ControlGroupRenderer extends React.Component<InputGroupProps> {
    constructor(props: InputGroupProps);
    renderControl(control: any, index: any, otherProps?: any): JSX.Element | null;
    renderVertical(props?: Readonly<InputGroupProps> & Readonly<{
        children?: React.ReactNode;
    }>): JSX.Element;
    renderHorizontal(props?: Readonly<InputGroupProps> & Readonly<{
        children?: React.ReactNode;
    }>): JSX.Element;
    renderInput(props?: Readonly<InputGroupProps> & Readonly<{
        children?: React.ReactNode;
    }>): JSX.Element;
    render(): JSX.Element;
}
