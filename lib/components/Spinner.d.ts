/**
 * @file Spinner
 * @description
 * @author fex
 * @date 2017-11-07
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface SpinnerProps {
    overlay: boolean;
    spinnerClassName: string;
    mode: string;
    size: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    show: boolean;
}
export declare class Spinner extends React.Component<SpinnerProps, object> {
    static defaultProps: {
        overlay: boolean;
        spinnerClassName: string;
        mode: string;
        size: string;
        show: boolean;
    };
    div: React.RefObject<HTMLDivElement>;
    overlay: React.RefObject<HTMLDivElement>;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<SpinnerProps, "classPrefix" | "classnames"> & Partial<Pick<SpinnerProps, "show" | "overlay" | "size" | "mode" | "spinnerClassName">> & Partial<Pick<{
    overlay: boolean;
    spinnerClassName: string;
    mode: string;
    size: string;
    show: boolean;
}, never>>, "show" | "overlay" | "size" | "mode" | "spinnerClassName"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Spinner;
};
export default _default;
