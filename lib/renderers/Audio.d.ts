import React from 'react';
import { RendererProps } from '../factory';
export interface AudioProps extends RendererProps {
    className?: string;
    inline?: boolean;
    src?: string;
    autoPlay?: boolean;
    loop?: boolean;
    rates?: number[];
    controls?: string[];
}
export interface AudioState {
    src?: string;
    isReady?: boolean;
    muted?: boolean;
    playing?: boolean;
    played: number;
    seeking?: boolean;
    volume: number;
    prevVolume: number;
    loaded?: number;
    playbackRate: number;
    showHandlePlaybackRate: boolean;
    showHandleVolume: boolean;
}
export declare class Audio extends React.Component<AudioProps, AudioState> {
    audio: any;
    progressTimeout: number;
    durationTimeout: number;
    static defaultProps: Pick<AudioProps, 'inline' | 'autoPlay' | 'playbackRate' | 'loop' | 'rates' | 'progressInterval' | 'controls'>;
    state: AudioState;
    componentWillUnmount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: AudioProps): void;
    progress(): void;
    audioRef(audio: any): void;
    load(): void;
    handlePlaybackRate(rate: number): void;
    handleMute(): void;
    handlePlaying(): void;
    getCurrentTime(): string;
    getDuration(): any;
    onDurationCheck(): void;
    onSeekChange(e: any): void;
    onSeekMouseDown(): void;
    onSeekMouseUp(e: any): void;
    setVolume(e: any): void;
    formatTime(seconds: number): string;
    pad(string: number): string;
    toggleHandlePlaybackRate(): void;
    toggleHandleVolume(type: boolean): void;
    renderRates(): JSX.Element | null;
    renderPlay(): JSX.Element;
    renderTime(): JSX.Element;
    renderProcess(): JSX.Element;
    renderVolume(): JSX.Element;
    render(): JSX.Element;
}
export declare class AudioRenderer extends Audio {
}
