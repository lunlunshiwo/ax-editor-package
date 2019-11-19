import React from 'react';
import { RendererProps } from '../factory';
import { IScopedContext } from '../Scoped';
export interface IFrameProps extends RendererProps {
    className?: string;
    src?: string;
}
export default class IFrame extends React.Component<IFrameProps, object> {
    IFrameRef: React.RefObject<HTMLIFrameElement>;
    static propsList: Array<string>;
    static defaultProps: Partial<IFrameProps>;
    reload(): void;
    render(): JSX.Element;
}
export declare class IFrameRenderer extends IFrame {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
