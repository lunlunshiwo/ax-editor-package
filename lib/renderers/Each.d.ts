import React from 'react';
import { RendererProps } from '../factory';
import { Schema } from '../types';
export interface EachProps extends RendererProps {
    name: string;
    items: Schema;
}
export default class Each extends React.Component<EachProps> {
    static propsList: Array<string>;
    static defaultProps: Partial<EachProps>;
    render(): JSX.Element;
}
export declare class EachRenderer extends Each {
}
