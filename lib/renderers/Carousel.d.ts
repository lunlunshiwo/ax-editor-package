import React from 'react';
import { RendererProps } from '../factory';
export interface CarouselProps extends RendererProps {
    className?: string;
    auto?: boolean;
    value?: any;
    placeholder?: any;
    width?: number;
    height?: number;
    controls: string[];
    interval: number;
    duration: number;
    controlsTheme: 'light' | 'dark';
    animation: 'fade' | 'slide';
}
export interface CarouselState {
    current: number;
    options: any[];
    showArrows: boolean;
    nextAnimation: string;
}
export declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    wrapperRef: React.RefObject<HTMLDivElement>;
    intervalTimeout: number;
    durationTimeout: number;
    static defaultProps: Pick<CarouselProps, 'auto' | 'interval' | 'duration' | 'controlsTheme' | 'animation' | 'controls' | 'placeholder'>;
    state: {
        current: number;
        options: any;
        showArrows: boolean;
        nextAnimation: string;
    };
    componentWillReceiveProps(nextProps: CarouselProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    prepareAutoSlide(): void;
    autoSlide(rel?: string): void;
    transitFramesTowards(direction: string, nextAnimation: string): void;
    getFrameId(pos?: string): number;
    next(): void;
    prev(): void;
    clearAutoTimeout(): void;
    renderDots(): JSX.Element;
    renderArrows(): JSX.Element;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    render(): JSX.Element;
}
export declare class CarouselRenderer extends Carousel {
}
