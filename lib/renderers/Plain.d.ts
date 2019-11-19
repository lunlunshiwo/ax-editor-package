import React from 'react';
import { RendererProps } from '../factory';
export interface PlainProps extends RendererProps {
    className?: string;
    tpl?: string;
    html?: string;
    text?: string;
    raw?: string;
    wrapperComponent?: any;
    inline?: boolean;
}
export declare class Plain extends React.Component<PlainProps, object> {
    static defaultProps: Partial<PlainProps>;
    render(): JSX.Element;
}
export declare class PlainRenderer extends Plain {
}
