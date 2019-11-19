import React from 'react';
import { FormControlProps } from './Item';
import { Payload, ApiObject, ApiString } from '../../types';
export interface FileProps extends FormControlProps {
    maxSize: number;
    maxLength: number;
    placeholder?: string;
    btnLabel?: string;
    reciever?: string;
    fileField?: string;
    joinValues?: boolean;
    extractValue?: boolean;
    delimiter?: string;
    downloadUrl?: string;
    useChunk?: 'auto' | boolean;
    chunkSize?: number;
    startChunkApi?: string;
    chunkApi?: string;
    finishChunkApi?: string;
    accept?: string;
    multiple?: boolean;
    autoUpload?: boolean;
    hideUploadButton?: boolean;
    stateTextMap?: {
        init: string;
        pending: string;
        uploading: string;
        error: string;
        uploaded: string;
        [propName: string]: string;
    };
    asBase64?: boolean;
    asBlob?: boolean;
    resetValue?: string;
}
export interface FileX extends File {
    state?: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid' | 'ready';
    progress?: number;
    id?: any;
}
export interface FileValue {
    filename?: string;
    value?: any;
    name?: string;
    url?: string;
    state: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid' | 'ready';
    id?: any;
    [propName: string]: any;
}
export interface FileState {
    uploading: boolean;
    files: Array<FileX | FileValue>;
    error?: string | null;
}
export default class FileControl extends React.Component<FileProps, FileState> {
    static defaultProps: Partial<FileProps>;
    state: FileState;
    current: FileValue | FileX | null;
    resolve?: (value?: any) => void;
    static valueToFile(value: string | FileValue, props: FileProps, files?: Array<FileX | FileValue>): FileValue | undefined;
    dropzone: React.RefObject<any>;
    constructor(props: FileProps);
    componentWillReceiveProps(nextProps: FileProps): void;
    handleDrop(files: Array<FileX>): void;
    handleDropRejected(rejectedFiles: any, evt: React.DragEvent<any>): void;
    handleSelect(): void;
    startUpload(): void;
    toggleUpload(e: React.MouseEvent<HTMLButtonElement>): void;
    stopUpload(): void;
    tick(): void;
    sendFile(file: FileX, cb: (error: null | string, file?: FileX, obj?: FileValue) => void, onProgress: (progress: number) => void): void;
    removeFile(file: FileX | FileValue, index: number): void;
    clearError(): void;
    onChange(): void;
    uploadFile(file: FileX, reciever: string, params: object, config: Partial<FileProps> | undefined, onProgress: (progress: number) => void): Promise<Payload>;
    uploadBigFile(file: FileX, reciever: string, params: object, config: Partial<FileProps> | undefined, onProgress: (progress: number) => void): Promise<Payload>;
    _send(api: ApiObject | ApiString, data?: any, options?: object, onProgress?: (progress: number) => void): Promise<Payload>;
    validate(): any;
    render(): JSX.Element;
}
export declare class FileControlRenderer extends FileControl {
}
