import React from 'react';
import { RendererProps } from '../factory';
export interface LinkProps extends RendererProps {
    className?: string;
    imageClassName?: string;
    placeholder?: string;
    description?: string;
}
export declare class LinkField extends React.Component<LinkProps, object> {
    static defaultProps: {
        className: string;
        blank: boolean;
    };
    render(): JSX.Element;
}
export declare class LinkFieldRenderer extends LinkField {
}
