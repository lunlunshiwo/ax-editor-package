/**
 * @file video
 * @author fex
 */
import React from 'react';
import { RendererProps } from '../factory';
import 'video-react/dist/video-react.css';
export interface FlvSourceProps {
    src?: string;
    type?: string;
    video?: any;
    config?: object;
    manager?: any;
    isLive?: boolean;
    autoPlay?: boolean;
    actions?: any;
    order?: number;
}
export declare class FlvSource extends React.Component<FlvSourceProps, any> {
    flvPlayer: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export interface HlsSourceProps {
    src?: string;
    type?: string;
    video?: any;
    config?: object;
    manager?: any;
    isLive?: boolean;
    autoPlay?: boolean;
    actions?: any;
    order?: number;
}
export declare class HlsSource extends React.Component<HlsSourceProps, any> {
    hls: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export interface VideoProps extends RendererProps {
    className?: string;
    columnsCount?: number;
    isLive?: boolean;
    jumpFrame?: boolean;
    src?: string;
}
export interface VideoState {
    posterInfo?: any;
    videoState?: any;
}
export default class Video extends React.Component<VideoProps, VideoState> {
    static defaultProps: {
        columnsCount: number;
        isLive: boolean;
        jumpFrame: boolean;
        aspectRatio: string;
    };
    frameDom: any;
    cursorDom: any;
    player: any;
    times: Array<number>;
    currentIndex: number;
    constructor(props: VideoProps);
    onImageLoaded(e: Event): void;
    frameRef(dom: any): void;
    cursorRef(dom: any): void;
    playerRef(player: any): void;
    moveCursorToIndex(index: number): void;
    jumpToIndex(index: number): void;
    onClick(e: Event): void;
    renderFrames(): JSX.Element | null;
    renderPlayer(): JSX.Element;
    renderPosterAndPlayer(): JSX.Element;
    render(): JSX.Element;
}
export declare class VideoRenderer extends Video {
}
