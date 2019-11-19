import React from 'react';
import { RendererProps } from '../../factory';
export interface FieldSetProps extends RendererProps {
    title?: string;
    collapsed?: boolean;
    mode?: 'normal' | 'inline' | 'horizontal' | 'row';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'base';
    formClassName?: string;
    collapsable?: boolean;
    horizontal: {
        left: string;
        right: string;
        offset: string;
    };
}
export default class FieldSetControl extends React.Component<FieldSetProps, any> {
    constructor(props: FieldSetProps);
    static defaultProps: {
        headingClassName: string;
        collapsable: boolean;
    };
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
export declare class FieldSetRenderer extends FieldSetControl {
}
