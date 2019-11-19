import React from 'react';
import { RendererProps } from '../factory';
export interface IconProps extends RendererProps {
    icon: string;
}
export declare class Icon extends React.Component<IconProps, object> {
    static defaultProps: Partial<IconProps>;
    render(): JSX.Element;
}
export declare class TplRenderer extends Icon {
}
