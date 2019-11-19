/**
 * @file PopOver
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface Offset {
    x: number;
    y: number;
}
export interface PopOverPorps {
    className?: string;
    placement?: string;
    positionTop?: number;
    positionLeft?: number;
    arrowOffsetLeft?: number;
    arrowOffsetTop?: number;
    offset?: ((clip: object, offset: object) => Offset) | Offset;
    style?: object;
    overlay?: boolean;
    onHide?: () => void;
    onClick?: (e: React.MouseEvent<any>) => void;
    classPrefix: string;
    classnames: ClassNamesFn;
    [propName: string]: any;
}
interface PopOverState {
    xOffset: number;
    yOffset: number;
}
export declare class PopOver extends React.PureComponent<PopOverPorps, PopOverState> {
    static defaultProps: {
        className: string;
        offset: {
            x: number;
            y: number;
        };
        overlay: boolean;
        placement: string;
    };
    state: {
        xOffset: number;
        yOffset: number;
    };
    parent: HTMLElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    mayUpdateOffset(): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<PopOverPorps, string | number> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof PopOver;
};
export default _default;
