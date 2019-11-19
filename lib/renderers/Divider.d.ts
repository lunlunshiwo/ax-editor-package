import React from 'react';
import { RendererProps } from '../factory';
export interface DividerProps extends RendererProps {
    lineStyle: 'dashed' | 'solid';
}
export default class Divider extends React.Component<DividerProps, object> {
    static defaultProps: Pick<DividerProps, 'className' | 'lineStyle'>;
    render(): JSX.Element;
}
export declare class DividerRenderer extends Divider {
}
