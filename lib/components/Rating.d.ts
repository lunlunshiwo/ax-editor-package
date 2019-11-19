/**
 * @file Rating
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface RatingProps {
    id?: string;
    key?: string | number;
    style?: React.CSSProperties;
    count: number;
    half: boolean;
    char: string;
    size: number;
    className?: string;
    onChange?: (value: any) => void;
    value: number;
    containerClass: string;
    readOnly: boolean;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Rating extends React.Component<RatingProps, any> {
    static defaultProps: {
        containerClass: string;
        readOnly: boolean;
        half: boolean;
        value: number;
        count: number;
        char: string;
        size: number;
    };
    constructor(props: RatingProps);
    componentDidMount(): void;
    componentWillReceiveProps(props: RatingProps): void;
    getRate(): number;
    getStars(activeCount?: number): {
        active: boolean;
    }[];
    mouseOver(event: React.ChangeEvent<any>): void;
    moreThanHalf(event: any, size: number): boolean;
    mouseLeave(): void;
    handleClick(event: React.ChangeEvent<any>): void;
    renderStars(): any;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<RatingProps, "style" | "key" | "id" | "className" | "classPrefix" | "classnames" | "onChange"> & Partial<Pick<RatingProps, "size" | "char" | "value" | "readOnly" | "containerClass" | "count" | "half">> & Partial<Pick<{
    containerClass: string;
    readOnly: boolean;
    half: boolean;
    value: number;
    count: number;
    char: string;
    size: number;
}, never>>, "style" | "size" | "key" | "char" | "id" | "value" | "className" | "readOnly" | "onChange" | "containerClass" | "count" | "half"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Rating;
};
export default _default;
