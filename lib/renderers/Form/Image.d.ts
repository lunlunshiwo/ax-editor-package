import React from 'react';
import { FormControlProps } from './Item';
import Cropper from 'react-cropper';
import 'blueimp-canvastoblob';
import { Payload } from '../../types';
export interface ImageProps extends FormControlProps {
    placeholder?: string;
    reciever?: string;
    limit?: {
        width?: number;
        height?: number;
        maxWidth?: number;
        minWidth?: number;
        maxHeight?: number;
        minHeight?: number;
        aspectRatio?: number;
        aspectRatioLabel?: string;
    };
    crop?: boolean | {
        aspectRatio?: number;
        [propName: string]: any;
    };
    accept?: string;
    hideUploadButton?: boolean;
    joinValues?: boolean;
    extractValue?: boolean;
    delimiter?: string;
    autoUpload?: boolean;
    multiple?: boolean;
}
export interface ImageState {
    uploading: boolean;
    locked: boolean;
    lockedReason?: string;
    files: Array<FileValue | FileX>;
    crop?: any;
    error?: string;
    cropFile?: FileValue;
    submitOnChange?: boolean;
}
export interface FileValue {
    value?: any;
    state: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid';
    url?: string;
    error?: string;
    info?: {
        width: number;
        height: number;
        len?: number;
    };
    [propName: string]: any;
}
export interface FileX extends File {
    id?: string | number;
    preview?: string;
    state?: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid';
    progress?: number;
    [propName: string]: any;
}
export default class ImageControl extends React.Component<ImageProps, ImageState> {
    static defaultProps: {
        limit: undefined;
        accept: string;
        reciever: string;
        hideUploadButton: boolean;
        placeholder: string;
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        autoUpload: boolean;
        multiple: boolean;
    };
    static formatFileSize(size: number | string, units?: string[]): string;
    static valueToFile(value: string | object, props?: ImageProps): FileValue | undefined;
    static sizeInfo(width?: number, height?: number): string;
    state: ImageState;
    cropper: React.RefObject<Cropper>;
    dropzone: React.RefObject<any>;
    current: FileValue | FileX | null;
    resolve?: (value?: any) => void;
    constructor(props: ImageProps);
    componentWillReceiveProps(nextProps: ImageProps): void;
    buildCrop(props: ImageProps): false | {
        [propName: string]: any;
        aspectRatio?: number | undefined;
    } | null | undefined;
    handleDropRejected(rejectedFiles: any, evt: React.DragEvent<any>): void;
    startUpload(): void;
    toggleUpload(): void;
    stopUpload(): void;
    tick(): void;
    removeFile(file: FileValue, index: number): void;
    editImage(index: number): void;
    onChange(): void;
    handleSelect(): void;
    handleDrop(files: Array<FileX>): void;
    handlePaste(e: React.ClipboardEvent<any>): void;
    handleCrop(): void;
    cancelCrop(): void;
    addFiles(files: Array<FileX>): void;
    sendFile(file: FileX, cb: (error: null | string, file: FileX, obj?: FileValue) => void, onProgress: (progress: number) => void): void;
    _upload(file: Blob, cb: (error: null | string, file: Blob, obj?: FileValue) => void, onProgress: (progress: number) => void): void;
    _send(file: Blob, reciever: string, params: object, onProgress: (progress: number) => void): Promise<Payload>;
    handleClick(): void;
    handleImageLoaded(index: number, e: React.UIEvent<any>): void;
    validate(): any;
    render(): JSX.Element;
}
export declare class ImageControlRenderer extends ImageControl {
}
